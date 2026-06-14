"use client";
import dynamic from "next/dynamic";
import { DefaultButton } from "./DefaultButton";
import ChatAssistant from "./ChatAssistant";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const MessageSquareMore = dynamic(
  () => import("lucide-react").then((mod) => mod.MessageSquareMore),
  {
    ssr: false,
  },
);

export function ChatPopover() {
  return (
    <div className="fixed right-5 bottom-5 z-10">
      <Popover>
        <PopoverTrigger asChild>
          <DefaultButton className="w-10 h-10 bg-white rounded-full">
            <MessageSquareMore />
          </DefaultButton>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-white rounded-md border border-gray-300 drop-shadow-sm p-0 box-border mr-4">
          <div className="border border-transparent border-b-gray-300 h-10 px-2 flex items-center">
            <h3>AI Assistant</h3>
          </div>
          <ChatAssistant />
        </PopoverContent>
      </Popover>
    </div>
  );
}
