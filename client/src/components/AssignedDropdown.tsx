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
      <DropdownMenuTrigger asChild className="">
        <Button className="">
          Select User
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-gray-300 shadow-sm">
        <form onSubmit={(event) => event.preventDefault()}>
          {profiles.map((profile: any) => (
            <DropdownMenuItem
              onClick={() => setAssignedInput(profile)}
              key={profile.id}
              className="hover:bg-gray-300"
            >
              {profile.name} ({profile.email})
            </DropdownMenuItem>
          ))}
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
