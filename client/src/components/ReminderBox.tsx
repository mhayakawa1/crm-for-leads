"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      className={`w-full max-w-sm border border-solid ${overdue ? "border-red-500" : ""}`}
    >
      <CardHeader>
        <CardTitle>{text}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          <li>{time}</li>
          {overdue ? <li className="text-red-500">Overdue</li> : ""}
          <li>Complete: {String(completed)}</li>
        </ul>
        <form onSubmit={handleSubmit}>
          <DefaultButton id="complete">Complete</DefaultButton>
          <DefaultButton id="delete">Delete</DefaultButton>
        </form>
      </CardContent>
    </Card>
  );
}
