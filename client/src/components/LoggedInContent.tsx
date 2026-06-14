import Menu from "@/components/Menu";
import { RemindersProvider } from "@/contexts/RemindersContext";
import { ChatPopover } from "./ChatPopover";

export default function LoggedInContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RemindersProvider>
      <div id="main-content" className="relative h-full w-full max-w-screen-md flex flex-col gap-2 container px-4 box-border">
        <Menu />
        <ChatPopover />
        {children}
      </div>
    </RemindersProvider>
  );
}
