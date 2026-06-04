"use client";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HistoryIcon } from "lucide-react";
import { User, Action } from "@/contexts/DataContext";
import { DefaultButton } from "./DefaultButton";

interface ActivityProps {
  data: User;
}

export function Activity({ data }: ActivityProps) {
  const { activity } = data;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <DefaultButton>
          <HistoryIcon />
        </DefaultButton>
      </PopoverTrigger>
      <PopoverContent
        className="bg-white border border-gray-300 shadow-sm"
        align="end"
        side="left"
      >
        <PopoverHeader>
          <PopoverTitle>Activity Timeline</PopoverTitle>
        </PopoverHeader>
        <ul className=" flex flex-col gap-2 max-h-[40vh] overflow-scroll">
          {activity.map((action: Action) => {
            return (
              <li key={action.id} className="flex flex-col">
                <span>{action.time}</span>
                <span>
                  {`${action.user.name} (${action.user.email}) ${action.descriptions[0]}`}
                </span>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
