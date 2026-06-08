"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useReminders } from "@/contexts/RemindersContext";
import { Button } from "./ui/button";

export function MenuTrigger() {
  const { activeReminders } = useReminders();

  return (
    <DropdownMenuTrigger asChild>
      <div className="relative p-1">
        <Button className="p-0 rounded-full w-fit">
          <Avatar>
            <AvatarImage src="" alt="@shadcn" className="grayscale" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
        {activeReminders ? (
          <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex justify-center items-center">
            {activeReminders}
          </div>
        ) : null}
      </div>
    </DropdownMenuTrigger>
  );
}
