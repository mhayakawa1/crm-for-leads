"use client";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useData } from "@/contexts/DataContext";

export function AddData() {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(crypto.randomUUID());
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [ageInput, setAgeInput] = useState(18);
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
  ];
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = {
      id: id,
      name: nameInput,
      email: emailInput,
      age: ageInput,
      status: "New",
      assigned_to: "",
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
      className="flex w-full flex-col gap-2 border border-solid"
    >
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="text-sm font-semibold">Add User</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <span className="sr-only">Toggle details</span>
            <Plus />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <form onSubmit={handleSubmit}>
          {inputData.map((input) => {
            const { label, type, value, onChange } = input;
            return (
              <div key={label} className="rounded-md border px-4 py-2 text-sm">
                <Label htmlFor={label}>{label}</Label>
                <Input
                  type={type}
                  value={value}
                  onChange={(event: any) => onChange(event?.target.value)}
                />
              </div>
            );
          })}
          <Button variant="outline">Submit</Button>
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
}
