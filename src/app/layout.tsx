import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PSI Technologies",
  description: "PSI Technologies is a leading provider of innovative software solutions, specializing in web, desktop and mobile applications and AI/ML driven solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
