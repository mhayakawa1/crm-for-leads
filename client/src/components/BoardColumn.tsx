import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useData } from "@/contexts/DataContext";
import { useState, useEffect, useRef } from "react";
import DropZone from "./DropZone";
import DragItem from "./DragItem";

interface ColumnProps {
  title: string;
  description: string;
  leads: any;
}

export default function BoardColumn({
  title,
  description,
  leads,
}: ColumnProps) {
  const { updateEndpoint } = useData();
  const leadsRef = useRef(leads);
  const [droppedItems, setDroppedItems] = useState<any>([...leads]);

  const handleDrop = (item: any) => {
    const { lead } = item;
    const newData = { status: title };
    updateEndpoint("PUT", JSON.stringify(newData), lead.id);
  };

  useEffect(() => {
    if (
      (leads && !droppedItems.length) ||
      (leads !== leadsRef.current && droppedItems.length)
    ) {
      setDroppedItems(leads);
      leadsRef.current = leads;
    }
  }, [leads, leadsRef, droppedItems]);

  return (
    <Card className="border border-gray-300 bg-white shadow-sm w-full m-auto max-w-sm h-fit">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <DropZone onDrop={handleDrop}>
          {droppedItems.map((lead: any) => {
            return <DragItem key={lead.id} lead={lead} />;
          })}
          {!leads.length ? <li>No leads.</li> : null}
        </DropZone>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
