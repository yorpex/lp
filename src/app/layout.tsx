import "@/styles/globals.css";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { Provider } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata = {
  title: "yorpex.",
  description:
    "Yorpex is a cutting-edge development agency specializing in various technology sectors, driving innovation and delivering exceptional results.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`min-h-screen bg-background font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}
      >
        <TRPCReactProvider>
          <Provider>{children}</Provider>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
