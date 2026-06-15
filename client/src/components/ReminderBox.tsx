"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Trash } from "lucide-react";
import { DefaultButton } from "./DefaultButton";
import { Reminder, useReminders } from "@/contexts/RemindersContext";

interface ReminderProps {
  reminder: Reminder;
}

export function ReminderBox({ reminder }: ReminderProps) {
  const { id, time, overdue, text, completed } = reminder;
  const { remindersList, updateReminders } = useReminders();

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nativeEvent = event.nativeEvent as SubmitEvent;
    const clickedButton = nativeEvent.submitter as HTMLButtonElement | null;
    const newRemindersList = [...remindersList];
    const index = newRemindersList.findIndex((reminder) => reminder.id === id);

    if (clickedButton) {
      const buttonId = clickedButton.id;
      if (buttonId === "complete") {
        const newReminder = newRemindersList[index];
        newReminder.completed = true;
        newReminder.overdue = false;
        newRemindersList.splice(index, 1, newReminder);
      } else if (buttonId === "delete") {
        newRemindersList.splice(index, 1);
      }
      const body = {
        reminders: newRemindersList,
      };
      updateReminders("PUT", JSON.stringify(body));
    }
  };

  return (
    <Card
      className={`w-full max-w-sm border ${overdue ? "border-red-500 bg-red-100" : "border-gray-300"}`}
    >
      <CardHeader>
        <CardTitle>{text}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <ul>
          <li>{time}</li>
          {overdue ? <li className="text-red-500">Overdue</li> : ""}
        </ul>
        <form onSubmit={handleSubmit} className="flex justify-between">
          <DefaultButton id="delete" className="w-8">
            <Trash />
          </DefaultButton>
          <DefaultButton id="complete" className="w-8">
            {completed ? <Check /> : null}
          </DefaultButton>
        </form>
      </CardContent>
    </Card>
  );
}
