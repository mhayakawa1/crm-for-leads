import Menu from "@/components/Menu";
import DashboardContent from "./../../components/DashboardContent";
import { DataProvider } from "@/contexts/DataContext";
import { RemindersProvider } from "@/contexts/RemindersContext";

export default function Dashboard() {
  return (
    <RemindersProvider>
      <div className="h-full w-full max-w-screen-md flex flex-col gap-2 container px-4 box-border">
        <Menu />
        <DataProvider>
          <DashboardContent />
        </DataProvider>
      </div>
    </RemindersProvider>
  );
}
