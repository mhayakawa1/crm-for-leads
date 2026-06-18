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
import { User, useData, Body } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { StatusDropdown } from "./StatusDropdown";
import { useState } from "react";
import { DefaultButton } from "./DefaultButton";
import { useEffect } from "react";
import { AssignedDropdown } from "./AssignedDropdown";

interface EditProps {
  data: User;
}

export function EditData({ data }: EditProps) {
  const { id, name, email, status, assigned_to, activity } = data;
  const [isOpen, setIsOpen] = useState(false);
  const [nameInput, setNameInput] = useState(name || "");
  const [emailInput, setEmailInput] = useState(email || "");
  const [statusInput, setStatusInput] = useState(status || "");
  const [assigned, setAssigned] = useState(
    assigned_to || { id: "", name: "", email: "" },
  );
  const { user } = useAuth();
  const { updateEndpoint, createDescription } = useData();
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
      type: "input",
      value: assigned,
      onChange: setAssigned,
    },
  ];
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body: Body = {
      name: nameInput,
      email: emailInput,
      status: statusInput,
      assigned_to: assigned,
    };
    const newActions = createDescription(user, data, body);
    body.activity = [newActions, ...activity];
    updateEndpoint("PUT", JSON.stringify(body), id);
    setIsOpen(false);
  };

  useEffect(() => {
    setNameInput(name);
    setEmailInput(email);
    setStatusInput(status);
    setAssigned(assigned_to);
    const values = [name, email, status, assigned];
    inputData.map((input, index) => (input.value = values[index]));
  }, [data]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
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
                  ) : label === "Assigned To" ? (
                    <AssignedDropdown setAssignedInput={setAssigned} />
                  ) : (
                    <Input
                      type={type}
                      value={typeof value === "string" ? value : ""}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        (onChange as (value: string) => void)(
                          event.target.value,
                        )
                      }
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
