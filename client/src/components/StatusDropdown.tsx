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
  setStatusInput: React.Dispatch<React.SetStateAction<string>>;
}

export function StatusDropdown({ setStatusInput }: DropdownProps) {
  const statuses = ["New", "Contacted", "Qualified", "Closed"];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="col-span-2 border border-gray-300">
        <Button className="flex justify-between">
          Select Status
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-gray-300 shadow-sm w-[--radix-dropdown-menu-trigger-width]">
        <form onSubmit={(event) => event.preventDefault()}>
          {statuses.map((status: string) => (
            <DropdownMenuItem
              onClick={() => setStatusInput(status)}
              key={status}
              className="hover:bg-gray-200"
            >
              {status}
            </DropdownMenuItem>
          ))}
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
