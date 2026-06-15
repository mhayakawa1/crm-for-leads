"use client";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { AddReminder } from "./AddReminder";
import { useReminders } from "@/contexts/RemindersContext";
import { ReminderBox } from "./ReminderBox";

export function RemindersContent() {
  const { remindersList } = useReminders();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-full flex-col gap-2 bg-white rounded-md border border-gray-300 drop-shadow-sm"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-2">
        <h4 className="text-sm font-semibold">Reminders</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <span className="sr-only">Toggle details</span>
            {isOpen ? <X /> : <Plus />}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col items-center w-full">
        <AddReminder />
        <div className="w-full flex flex-col gap-2 items-center pb-4">
          {remindersList.map((reminder) => (
            <ReminderBox key={reminder.id} reminder={reminder} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
