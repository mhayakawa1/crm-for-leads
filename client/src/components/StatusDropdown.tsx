"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
export function StatusDropdown() {
  const statuses = ["New", "Contacted", "Qualified", "Closed"];
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="">
        <Button className="">
          Select Status
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-solid">
        {statuses.map((status: string) => (
          <DropdownMenuItem key={status} className="hover:bg-gray-300">
            {status}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
