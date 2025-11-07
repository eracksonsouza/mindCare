import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MindCare - Cuidado Emocional para Estudantes",
  description: "Plataforma de apoio emocional para adolescentes estudantes. Faça check-in das suas emoções e acesse microintervenções para autocuidado.",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
