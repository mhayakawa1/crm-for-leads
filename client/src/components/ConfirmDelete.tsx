import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useData } from "@/contexts/DataContext";
import { useState } from "react";
import { DefaultButton } from "./DefaultButton";

interface DeleteProps {
  data: any;
}

export function ConfirmDelete({ data }: DeleteProps) {
  const { id } = data;
  const { updateEndpoint } = useData();
  const [open, setOpen] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nativeEvent = event.nativeEvent as SubmitEvent;
    const clickedButton = nativeEvent.submitter as HTMLButtonElement | null;

    if (clickedButton) {
      const buttonId = clickedButton.id;
      if (buttonId === "delete") {
        updateEndpoint("DELETE", "", id);
      } else if (buttonId === "cancel") {
        setOpen(false);
      }
    }
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="bg-gray-300">
        <Button
          variant="outline"
          className="border hover:border-gray-500 bg-gray-100 hover:bg-white hover:text-gray-500"
        >
          <Trash />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-white border border-gray-300 shadow-sm"
        align="end"
      >
        <PopoverHeader>
          <PopoverTitle>
            Are you sure you want to delete this item?
          </PopoverTitle>
        </PopoverHeader>
        <form onSubmit={handleSubmit} className="flex justify-between w-full">
          <DefaultButton id="cancel">Cancel</DefaultButton>
          <DefaultButton id="delete">Delete</DefaultButton>
        </form>
      </PopoverContent>
    </Popover>
  );
}
