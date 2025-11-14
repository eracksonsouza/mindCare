export const metadata = {
  title: "MindCare - Intervenções",
  description: "Explore microintervenções para autocuidado, foco e bem-estar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
