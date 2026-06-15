import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Action } from "@/contexts/DataContext";

interface ActivityProps {
  activity: any[];
}

export function ActivityTimeline({ activity }: ActivityProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex mx-12 flex-col gap-2 bg-white rounded-md border border-gray-300 drop-shadow-sm"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-2">
        <h4 className="text-sm font-semibold">Activity Timeline</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <span className="sr-only">Toggle details</span>
            {isOpen ? <X /> : <Plus />}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-8 items-center">
        <ul className="flex flex-col gap-4 max-h-[40vh] overflow-y-scroll pb-8 pr-4 text-sm">
          {activity.map((action: Action) => {
            return (
              <li key={action.id} className="flex flex-col">
                <span className="font-semibold">{action.time}</span>
                <span>
                  {`${action.user.name} (${action.user.email}) ${action.descriptions[0]}`}
                </span>
              </li>
            );
          })}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
