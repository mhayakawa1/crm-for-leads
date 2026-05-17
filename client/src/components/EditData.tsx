"use client";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { User } from "@/contexts/DataContext";
import { StatusDropdown } from "./StatusDropdown";
import { useData } from "@/contexts/DataContext";
import { useState } from "react";
import { DefaultButton } from "./DefaultButton";

interface EditProps {
  data: User;
}

export function EditData({ data }: EditProps) {
  const { id, name, email, status, assigned_to } = data;
  const [nameInput, setNameInput] = useState(name || "");
  const [emailInput, setEmailInput] = useState(email || "");
  const [statusInput, setStatusInput] = useState(status || "");
  const [assigned, setAssigned] = useState(assigned_to || "");
  const { updateEndpoint } = useData();
  const inputData = [
    { label: "Name", type: "text", value: nameInput, onChange: setNameInput },
    {
      label: "Email",
      type: "email",
      value: emailInput,
      onChange: setEmailInput,
    },
    {
      label: "Status",
      type: "string",
      value: statusInput,
      onChange: setStatusInput,
    },
    {
      label: "Assigned To",
      type: "text",
      value: assigned,
      onChange: setAssigned,
    },
  ];
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = {
      name: nameInput,
      email: emailInput,
      status: statusInput,
      assigned_to: assigned,
    };
    updateEndpoint("PUT", JSON.stringify(body), id);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <DefaultButton>
          <Edit />
        </DefaultButton>
      </PopoverTrigger>
      <PopoverContent
        className="bg-white border border-gray-300 shadow-sm"
        align="end"
      >
        <PopoverHeader>
          <PopoverTitle>Edit Data</PopoverTitle>
        </PopoverHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            {inputData.map((input) => {
              const { label, type, value, onChange } = input;
              return (
                <div
                  key={label}
                  className="grid grid-cols-3 items-center gap-4"
                >
                  <Label htmlFor={label}>{label}</Label>
                  {label === "Status" ? (
                    <StatusDropdown setStatusInput={setStatusInput} />
                  ) : (
                    <Input
                      type={type}
                      value={value}
                      onChange={(event: any) => onChange(event?.target.value)}
                      className="col-span-2 h-8 border border-gray-300"
                    />
                  )}
                </div>
              );
            })}
          </div>
          <DefaultButton>Save</DefaultButton>
        </form>
      </PopoverContent>
    </Popover>
  );
}
