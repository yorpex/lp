import { z } from "zod";

import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "10 m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export const contactRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const ip = ctx.headers.get("x-forwarded-for");
      if (!ip) return false;

      const { success } = await ratelimit.limit(ip);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const response = await fetch(env.CONTACT_WEBHOOK, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: input.name,
          content: input.content + `\nfrom: ${input.email}`,
        }),
      });

      if (!response.ok) throw new TRPCError({ code: "BAD_REQUEST" });
      return true;
    }),
});
