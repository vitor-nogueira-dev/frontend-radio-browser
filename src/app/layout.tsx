"use client";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "react-query";

import { UiProvider } from "@/context/UIContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <head>
        <title>Radio Browser</title>
        <meta name="description" content="Sua rádio online" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <UiProvider>
            <FavoritesProvider>
              <Toaster position="top-right" visibleToasts={1} richColors />
              {children}
            </FavoritesProvider>
          </UiProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
