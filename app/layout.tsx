import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeCrew",
  description: "made with love by ubaid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
