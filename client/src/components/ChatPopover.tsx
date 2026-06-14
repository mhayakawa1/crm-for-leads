import { Button } from "@/components/ui/button";
import ChatAssistant from "./ChatAssistant";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ChatPopover() {
  return (
    <div className="fixed right-5 bottom-5">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-10">
            Chat
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <ChatAssistant />
        </PopoverContent>
      </Popover>
    </div>
  );
}
