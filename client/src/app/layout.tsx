"use client";
import "./../index.css";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex items-start justify-center min-h-screen bg-gray-100 antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
