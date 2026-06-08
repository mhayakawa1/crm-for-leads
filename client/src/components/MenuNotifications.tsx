import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useReminders } from "@/contexts/RemindersContext";

export function MenuNotifications() {
  const { activeReminders } = useReminders();
  return (
    <DropdownMenuItem className="focus:outline-none">
      {activeReminders ? `${activeReminders}` : "No"} Reminder
      {activeReminders === 1 ? "" : "s"}
    </DropdownMenuItem>
  );
}
