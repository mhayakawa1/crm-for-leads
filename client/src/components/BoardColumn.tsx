import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useData, Body, User } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect, useRef } from "react";
import DropZone from "./DropZone";
import DragItem from "./DragItem";

interface ColumnProps {
  title: string;
  description: string;
  leads: User[];
}

interface DropItem {
  lead: User;
}

export default function BoardColumn({
  title,
  description,
  leads,
}: ColumnProps) {
  const { updateEndpoint, createDescription } = useData();
  const { user } = useAuth();
  const leadsRef = useRef(leads);
  const [droppedItems, setDroppedItems] = useState<User[]>([...leads]);

  const handleDrop = (item: DropItem) => {
    const { lead } = item;
    const body: Body = { status: title };
    const newActions = createDescription(user, lead, body);
    body.activity = [newActions];
    updateEndpoint("PUT", JSON.stringify(body), lead.id);
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
          {droppedItems.map((lead: User) => {
            return <DragItem key={lead.id} lead={lead} />;
          })}
          {!leads.length ? <li>No leads.</li> : null}
        </DropZone>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
