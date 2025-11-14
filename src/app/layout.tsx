import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MindCare - Cuidado Emocional para Estudantes",
    template: "%s | MindCare",
  },
  description:
    "Plataforma de apoio emocional para adolescentes estudantes. Faça check-in das suas emoções e acesse microintervenções para autocuidado.",
  keywords: [
    "saúde mental",
    "autocuidado",
    "bem-estar",
    "estudantes",
    "emoções",
    "mindfulness",
  ],
  authors: [{ name: "MindCare Team" }],
  creator: "MindCare",
  publisher: "MindCare",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MindCare - Cuidado Emocional para Estudantes",
    description:
      "Plataforma de apoio emocional para adolescentes estudantes. Faça check-in das suas emoções e acesse microintervenções para autocuidado.",
    url: "/",
    siteName: "MindCare",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "MindCare Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MindCare - Cuidado Emocional para Estudantes",
    description: "Plataforma de apoio emocional para adolescentes estudantes.",
    images: ["/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MindCare",
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
        <meta name="theme-color" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
