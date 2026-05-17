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
      <DropdownMenuTrigger asChild className="">
        <Button className="">
          Select Status
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-gray-300 shadow-sm">
        <form onSubmit={(event) => event.preventDefault()}>
          {statuses.map((status: string) => (
            <DropdownMenuItem
              onClick={() => setStatusInput(status)}
              key={status}
              className="hover:bg-gray-300"
            >
              {status}
            </DropdownMenuItem>
          ))}
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
