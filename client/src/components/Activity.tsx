"use client";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, HistoryIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { User } from "@/contexts/DataContext";
import { StatusDropdown } from "./StatusDropdown";
import { useData } from "@/contexts/DataContext";
import { useState } from "react";
import { DefaultButton } from "./DefaultButton";
import { useEffect } from "react";
import { AssignedDropdown } from "./AssignedDropdown";

interface ActivityProps {
  data: User;
}

export function Activity({ data }: ActivityProps) {
  const { id, name, email, status, assigned_to } = data;
  const [nameInput, setNameInput] = useState(name || "");
  const [emailInput, setEmailInput] = useState(email || "");
  const [statusInput, setStatusInput] = useState(status || "");
  const [assigned, setAssigned] = useState(
    assigned_to || { id: "", name: "", email: "" },
  );
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
      type: "input",
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

  useEffect(() => {
    setNameInput(name);
    setEmailInput(email);
    setStatusInput(status);
    setAssigned(assigned_to);
    const values = [name, email, status, assigned];
    inputData.map((input, index) => (input.value = values[index]));
  }, [data]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <DefaultButton>
          <HistoryIcon />
        </DefaultButton>
      </PopoverTrigger>
      <PopoverContent
        className="bg-white border border-gray-300 shadow-sm"
        align="end"
        side="left"
      >
        <PopoverHeader>
          <PopoverTitle>Activity Timeline</PopoverTitle>
        </PopoverHeader>
        <div></div>
      </PopoverContent>
    </Popover>
  );
}
