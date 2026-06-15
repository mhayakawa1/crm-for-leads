"use client";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export function ReminderInput({ label, type, min, onChange }: any) {
  const className = "border border-gray-300";
  return (
    <div className="py-2 text-sm flex flex-col gap-2">
      <Label htmlFor={label}>{label}</Label>
      {type === "textarea" ? (
        <Textarea
          id={label}
          onChange={onChange}
          required
          className={className}
        />
      ) : (
        <Input
          id={label}
          type={type}
          onChange={onChange}
          min={min}
          required
          className={className}
        />
      )}
    </div>
  );
}
