"use client";
import DashboardLink from "./DashboardLink";
import BoardColumn from "./BoardColumn";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useData } from "@/contexts/DataContext";

export default function EditStatusesContent() {
  const { data } = useData();

  const statusesInfo = [
    { title: "New", description: "Leads recently added" },
    { title: "Contacted", description: "Leads reached out to" },
    { title: "Qualified", description: "Leads fitting criteria" },
    { title: "Closed", description: "Leads won or lost" },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="">
        <DashboardLink />
        <div className="flex gap-2 items-start py-10">
          {statusesInfo.map((status) => {
            const { title, description } = status;
            return (
              <BoardColumn
                key={title}
                title={title}
                description={description}
                leads={data.filter((user) => user.status === title)}
              />
            );
          })}
        </div>
      </div>
    </DndProvider>
  );
}
