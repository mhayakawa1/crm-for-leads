"use client";
import "./../index.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body  className="h-[100vh] flex justify-center items-center p-8 max-w-4xl mx-auto space-y-4">{children}</body>
    </html>
  );
}
