import type { Metadata } from "next";
import "./globals.css"
export const metadata: Metadata = {
  title: "Europe Shop Inventory Application",
  description: "Manager Staff and clients seamlessly",
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
