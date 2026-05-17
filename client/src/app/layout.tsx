"use client";
import "./../index.css";
import { DataProvider } from "@/contexts/DataContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex items-start justify-center min-h-screen bg-gray-100 antialiased">
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
