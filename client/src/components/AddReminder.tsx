"use client";
import { useState } from "react";
import { DefaultButton } from "./DefaultButton";
import { useReminders } from "@/contexts/RemindersContext";
import { InputContainer } from "./InputContainer";

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
    if (id === "reminder") setText(value);
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 pb-4 w-full max-w-[500px]">
      <h3>Add Reminder</h3>
      <InputContainer
        label="Date"
        type="date"
        value={date}
        min={today}
        onChange={handleChange}
      />
      <InputContainer
        label="Time"
        type="time"
        value={time}
        onChange={handleChange}
      />
      <InputContainer
        label="Reminder"
        type="textarea"
        placeholder="New reminder"
        value={text}
        onChange={handleChange}
      />
      <DefaultButton className="mt-2 w-full">Submit</DefaultButton>
    </form>
  );
}
