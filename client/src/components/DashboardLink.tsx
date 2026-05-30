"use client";
import Link from "next/link";

export default function DashboardLink() {
  return (
    <Link href="/dashboard" className="w-fit text-center hover:underline">
      ← Dashboard
    </Link>
  );
}
