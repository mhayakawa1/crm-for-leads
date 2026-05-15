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

export function FilterDropdown({ setFilterBy }: DropdownProps) {
  const filters = ["Name", "Email", "Status", "Assigned To"];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className='mx-2'>
        <Button variant="outline">
          Select Filter
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-solid">
        {filters.map((filter: string) => (
          <DropdownMenuItem
            key={filter}
            onSelect={() => setFilterBy(filter.toLowerCase())}
          >
            {filter}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
