import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";

interface DeleteProps {
  data: any;
}

export function ConfirmDelete({ data }: DeleteProps) {
  return (
    <Popover>
      <PopoverTrigger asChild className="bg-gray-300">
        <Button variant="outline">X</Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white border border-solid">
        <PopoverHeader>
          <PopoverTitle>
            Are you sure you want to delete this item?
          </PopoverTitle>
        </PopoverHeader>
        <form className="flex justify-between w-full">
          <Button className="bg-gray-300 border border-solid">Cancel</Button>
          <Button className="bg-gray-300 border border-solid">Delete</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
