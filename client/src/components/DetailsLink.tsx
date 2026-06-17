"use client";
import Link from "next/link";

export default function DetailsLink({ id }: { id: string }) {
  return (
    <Link
      href={`/details/${id}`}
      className="mx-auto text-center hover:underline"
    >
      Details
    </Link>
  );
}
