"use client";
import "./../index.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex items-center min-h-screen bg-background antialiased">
        {children}
      </body>
    </html>
  );
}
