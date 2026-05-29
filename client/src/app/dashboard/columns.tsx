"use client";

import { ColumnDef } from "@tanstack/react-table";
import FilterButton from "@/components/FilterButton";
import { User } from "@/contexts/DataContext";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: () => {
      return <FilterButton name="Name" value="name" />;
    },
  },
  {
    accessorKey: "email",
    header: () => {
      return <FilterButton name="Email" value="email" />;
    },
  },
  {
    accessorKey: "status",
    header: () => {
      return <FilterButton name="Status" value="status" />;
    },
  },
  {
    id: "assigned_to",
    accessorKey: "assigned_to",
    header: () => {
      return <div>Assigned To</div>
    },
  },
  {
    id: "created_at",
    accessorKey: "created_at",
    header: () => {
      return <FilterButton name="Created At" value="created_at" />;
    },
  },
];
