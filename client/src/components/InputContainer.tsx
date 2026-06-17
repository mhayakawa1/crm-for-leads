"use client";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface InputProps {
  label: string;
  type?: string;
  value?: string;
  min?: string;
  onChange?: (
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => void;
  placeholder?: string;
}

export function InputContainer({
  label,
  type,
  value,
  min,
  onChange,
  placeholder,
}: InputProps) {
  const className = "border border-gray-300";
  return (
    <div className="py-2 text-sm flex flex-col gap-2">
      <Label htmlFor={label}>{label}</Label>
      {type === "textarea" ? (
        <Textarea
          id={label.toLowerCase()}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          required
          className={`whitespace-pre-wrap h-20 ${className}`}
        />
      ) : (
        <Input
          id={label.toLowerCase()}
          type={type}
          onChange={onChange}
          min={min}
          value={value}
          placeholder={placeholder}
          required
          className={className}
        />
      )}
    </div>
  );
}
