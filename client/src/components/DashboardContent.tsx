"use client";
import { useState, useEffect } from "react";
import { columns } from "@/app/dashboard/columns";
import { DataTable } from "@/app/dashboard/data-table";
import { AddData } from "@/components/AddData";

export default function DashboardContent(data: any) {
  const [filterBy, setFilterBy] = useState("name");

  useEffect(() => {}, [filterBy, setFilterBy]);
  console.log(data);

  return (
    <div className="flex flex-col gap-2 container mx-auto py-10 px-4 border border-solid box-border">
      <AddData />
      <DataTable
        columns={columns}
        data={data.data}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />
    </div>
  );
}
