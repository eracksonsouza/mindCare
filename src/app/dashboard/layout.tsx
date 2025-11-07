import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Emocional - MindCare",
  description: "Acompanhe sua jornada emocional semanal e veja insights sobre como você tem se sentido.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
