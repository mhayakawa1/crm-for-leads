"use client";
import { Input } from "./ui/input";
import { useState } from "react";
import { DefaultButton } from "./DefaultButton";
import { Textarea } from "./ui/textarea";
import { useReminders } from "@/contexts/RemindersContext";

export function AddReminder() {
  const { options, today, updateReminders, remindersList } = useReminders();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fullDateTime = `${date} ${time}`;
    const newTime = new Date(fullDateTime).toLocaleString("en-US", options);

    const newReminder = {
      id: crypto.randomUUID(),
      time: newTime,
      text: text,
      upcoming: true,
      overdue: false,
      completed: false,
    };
    const newList = [newReminder, ...remindersList];
    if (date && time && text) {
      updateReminders("PUT", JSON.stringify({ reminders: newList }));
      setDate("");
      setTime("");
      setText("");
    }
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { id, value } = event.target;
    if (id === "date") setDate(value);
    if (id === "time") setTime(value);
    if (id === "text") setText(value);
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 pb-4 w-full max-w-[500px]">
      <h3>Add Reminder</h3>
      <Input
        id="date"
        type="date"
        min={today}
        onChange={handleChange}
        required
      />
      <Input id="time" type="time" onChange={handleChange} required />
      <Textarea id="text" onChange={handleChange} required />
      <DefaultButton className="mt-2 w-full">+</DefaultButton>
    </form>
  );
}
