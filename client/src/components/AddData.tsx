"use client";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { DefaultButton } from "./DefaultButton";
import { AssignedDropdown } from "./AssignedDropdown";

export function AddData() {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(crypto.randomUUID());
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [ageInput, setAgeInput] = useState(18);
  const [assignedInput, setAssignedInput] = useState({
    id: "",
    name: "",
    email: "",
  });
  const { updateEndpoint } = useData();
  const inputData = [
    { label: "Name", type: "text", value: nameInput, onChange: setNameInput },
    {
      label: "Email",
      type: "email",
      value: emailInput,
      onChange: setEmailInput,
    },
    { label: "Age", type: "number", value: ageInput, onChange: setAgeInput },
    {
      label: "Assigned To",
      type: "text",
      value: assignedInput,
      onChange: setAssignedInput,
    },
  ];
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = {
      id: id,
      name: nameInput,
      email: emailInput,
      age: ageInput,
      status: "New",
      assigned_to: assignedInput,
      notes: [],
    };
    setId(crypto.randomUUID());
    updateEndpoint("POST", JSON.stringify(body), "");
    setNameInput("");
    setEmailInput("");
    setAgeInput(18);
    setIsOpen(false);
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-full flex-col gap-2 bg-white rounded-md border border-gray-300 drop-shadow-sm"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-2">
        <h4 className="text-sm font-semibold">Add User</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <span className="sr-only">Toggle details</span>
            {isOpen ? <X /> : <Plus />}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col items-center w-full">
        <form
          onSubmit={handleSubmit}
          className="px-4 pb-4 w-full max-w-[500px]"
        >
          {inputData.map((input) => {
            const { label, type, value, onChange } = input;
            return (
              <div key={label} className="py-2 text-sm flex flex-col gap-2">
                <Label htmlFor={label}>{label}</Label>
                {label === "Assigned To" ? (
                  <AssignedDropdown setAssignedInput={setAssignedInput} />
                ) : (
                  <Input
                    type={type}
                    value={typeof value === "string" ? value : ""}
                    onChange={(event: any) => onChange(event?.target.value)}
                    className="border border-gray-300"
                  />
                )}
              </div>
            );
          })}
          <DefaultButton className="mt-2 w-full">Submit</DefaultButton>
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
}
