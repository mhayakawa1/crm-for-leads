"use client";
import { useDrag } from "react-dnd";
import { User } from "@/contexts/DataContext";

const DragItem = ({ lead }: { lead: User }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: { lead },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <li
      ref={(item) => {
        drag(item);
      }}
      className={`${isDragging ? "opacity-50" : ""} cursor-move rounded-lg bg-gray-200 p-2`}
    >
      {lead ? lead.name : ""}
    </li>
  );
};

export default DragItem;
