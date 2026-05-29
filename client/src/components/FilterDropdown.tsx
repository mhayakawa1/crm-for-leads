"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  setFilterBy: React.Dispatch<React.SetStateAction<string>>;
}

interface Filter {
  accessorKey: string;
  header: string;
}

export function FilterDropdown({ setFilterBy }: DropdownProps) {
  const filters = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "status", header: "Status" },
  ];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="mx-2 border border-gray-300">
        <Button variant="outline">
          Select Filter
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-gray-300">
        {filters.map((filter) => {
          const { accessorKey, header } = filter as Filter;
          return (
            <DropdownMenuItem
              key={accessorKey}
              onSelect={() => setFilterBy(accessorKey)}
              className="hover:bg-gray-200"
            >
              {header}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
