"use client";
import { useDrop } from "react-dnd";

const DropZone = ({ children, onDrop }: any) => {
  const [{}, drop] = useDrop(() => ({
    accept: "item",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <ul
      ref={(item) => {
        drop(item);
      }}
      className="border border-dashed rounded-lg flex flex-col gap-2 p-2"
    >
      {children}
    </ul>
  );
};

export default DropZone;
