"use client";
import { useState, useEffect } from "react";
import { columns } from "@/app/dashboard/columns";
import { DataTable } from "@/app/dashboard/data-table";
import { AddData } from "@/components/AddData";
import { RemindersContent } from "./RemindersContent";
import Link from "next/link";

import { useData } from "@/contexts/DataContext";
export default function DashboardContent() {
  const { data } = useData();
  const [filterBy, setFilterBy] = useState("name");

  useEffect(() => {}, [filterBy, setFilterBy]);

  return (
    <div className="relative flex flex-col gap-2 container mx-auto py-10 px-4 box-border">
      {/* <ChatPopover/> */}
      <Link href="/edit-statuses" className="w-fit text-center hover:underline">
        Edit Lead Statuses
      </Link>
      <Link href="/analytics" className="w-fit text-center hover:underline">
        Analytics
      </Link>
      <Link href="/email" className="w-fit text-center hover:underline">
        Email
      </Link>
      <RemindersContent />
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
