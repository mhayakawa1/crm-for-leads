"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useData, AssignedTo, User } from "@/contexts/DataContext";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { Profile } from "@/contexts/AuthContext";

interface DropdownProps {
  setAssignedInput: React.Dispatch<React.SetStateAction<AssignedTo>>;
}

interface Option {
  value: Profile;
  index: number;
  array: Profile[];
}

export function AssignedDropdown({ setAssignedInput }: DropdownProps) {
  const { profiles } = useData();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        asChild
        className="col-span-2 border border-gray-300"
      >
        <Button className="flex justify-between">
          Select User
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-gray-300 shadow-sm w-[--radix-dropdown-menu-trigger-width]">
        <form onSubmit={(event) => event.preventDefault()}>
          {profiles.map((profile: any) => {
            const {id, email, name} = profile;
            return (
            <DropdownMenuItem
              onClick={() => setAssignedInput(profile as AssignedTo)}
              key={id}
              className="hover:bg-gray-200"
            >
              {name} ({email})
            </DropdownMenuItem>)
})}
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
