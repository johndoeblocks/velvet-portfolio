import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Velvet Neuron Lead Auto",
  description: "Ferramenta interna de prospeção local"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  );
}
