import Menu from "@/components/Menu";
import EditStatusesContent from "@/components/EditStatusesContent";
import { DataProvider } from "@/contexts/DataContext";

export default function EditStatuses() {
  return (
    <div className="h-full w-full max-w-screen-md flex flex-col gap-2 container px-4 box-border">
      <Menu />
      <DataProvider>
        <EditStatusesContent />
      </DataProvider>
    </div>
  );
}
