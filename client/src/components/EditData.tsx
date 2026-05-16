"use client";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { User } from "@/contexts/DataContext";
import { StatusDropdown } from "./StatusDropdown";
import { useData } from "@/contexts/DataContext";
import { useState } from "react";

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
      <PopoverTrigger asChild className="bg-gray-300">
        <Button variant="outline">Edit</Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white border border-solid">
        <PopoverHeader>
          <PopoverTitle>Edit Data</PopoverTitle>
        </PopoverHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Name</Label>
              <Input
                id="width"
                value={nameInput}
                onChange={(event: any) => setNameInput(event?.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Email</Label>
              <Input
                id="maxWidth"
                value={emailInput}
                onChange={(event: any) => setEmailInput(event?.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Status</Label>
              <StatusDropdown setStatusInput={setStatusInput} />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Assigned To</Label>
              <Input
                id="maxHeight"
                value={assigned}
                onChange={(event: any) => setAssigned(event?.target.value)}
                className="col-span-2 h-8"
              />
            </div>
          </div>
          <Button className="border border-solid">Save</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
