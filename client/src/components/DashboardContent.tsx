"use client";
import { useState, useEffect } from "react";
import { columns } from "@/app/dashboard/columns";
import { DataTable } from "@/app/dashboard/data-table";
import { AddData } from "@/components/AddData";
import Link from "next/link";

import { useData } from "@/contexts/DataContext";
export default function DashboardContent() {
  const { data } = useData();
  const [filterBy, setFilterBy] = useState("name");

  useEffect(() => {}, [filterBy, setFilterBy]);

  return (
    <div className="flex flex-col gap-2 container mx-auto py-10 px-4 box-border">
      <Link href="/edit-statuses" className="w-fit text-center hover:underline">
        Edit Lead Statuses
      </Link>
      <AddData />
      <DataTable
        columns={columns}
        data={data}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />
    </div>
  );
}
