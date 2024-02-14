"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  email: z.string().email(),
  name: z
    .string()
    .min(3, {
      message: "Your name is not so small.",
    })
    .max(50, {
      message: "We don&apos;t want all your data",
    }),
  content: z
    .string()
    .min(2, {
      message: "Very small message",
    })
    .max(1024, {
      message: "Limit reached, you can chat with us at contact@yorpex.com",
    }),
});

export function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      email: "",
      name: "",
    },
  });

  const { mutateAsync: contact } = api.contact.create.useMutation({
    onError(error) {
      if (error.data?.code === "TOO_MANY_REQUESTS")
        return toast.error("Too many requests");
      return toast.error("Something went wrong, please try again later.");
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const ok = await contact({
      ...values,
    });

    if (ok) return toast("Thank you for your message!");

    toast.error("Something went wrong, please try again later.");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">Contact us</Button>
      </DialogTrigger>
      <DialogContent className="bg-background/50 backdrop-blur-2xl sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Yes you can send a message</DialogTitle>
          <DialogDescription>Just be respectful.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="youremail@yorpex.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Contact us..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
