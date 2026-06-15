"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DashboardLink() {
  return (
    <Link
      href="/dashboard"
      className="flex gap-2 w-fit text-center hover:underline"
    >
      <ArrowLeft /> <span>Dashboard</span>
    </Link>
  );
}
