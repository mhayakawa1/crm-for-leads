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
import { User } from "@/app/dashboard/columns";
import { StatusDropdown } from "./StatusDropdown";

interface EditProps {
  data: User;
}

export function EditData({ data }: EditProps) {
  const { name, email, status, assigned_to } = data;
  const statuses = ["New", "Contacted", "Qualified", "Closed"];
  return (
    <Popover>
      <PopoverTrigger asChild className="bg-gray-300">
        <Button variant="outline">Edit</Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white border border-solid">
        <PopoverHeader>
          <PopoverTitle>Edit Data</PopoverTitle>
        </PopoverHeader>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Name</Label>
              <Input
                id="width"
                defaultValue={name}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Email</Label>
              <Input
                id="maxWidth"
                defaultValue={email}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Status</Label>
              <StatusDropdown />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Assigned To</Label>
              <Input
                id="maxHeight"
                defaultValue={assigned_to}
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
