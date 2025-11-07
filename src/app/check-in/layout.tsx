import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check-in Emocional - MindCare",
  description: "Faça o check-in das suas emoções e reconheça como você está se sentindo agora.",
};

export default function CheckInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
