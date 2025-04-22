// app/layout.tsx
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GameShelf",
  description: "Sua Biblioteca de Jogos",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/android/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/android/icon-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: "/icons/android/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/android/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/android/icon-512x512.png" />
        <link rel="apple-touch-icon" href="/icons/android/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1f2937" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >

        <ServiceWorkerRegister /> 

        {children}
      </body>
    </html>
  );
}