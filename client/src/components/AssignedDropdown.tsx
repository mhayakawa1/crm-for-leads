"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useData, AssignedTo } from "@/contexts/DataContext";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  setAssignedInput: React.Dispatch<React.SetStateAction<AssignedTo>>;
}

export function AssignedDropdown({ setAssignedInput }: DropdownProps) {
  const { profiles } = useData();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="col-span-2 border border-gray-300">
        <Button className="flex justify-between">
          Select User
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-gray-300 shadow-sm w-[--radix-dropdown-menu-trigger-width]">
        <form onSubmit={(event) => event.preventDefault()}>
          {profiles.map((profile: any) => (
            <DropdownMenuItem
              onClick={() => setAssignedInput(profile)}
              key={profile.id}
              className="hover:bg-gray-200"
            >
              {profile.name} ({profile.email})
            </DropdownMenuItem>
          ))}
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
