import DashboardContent from "./../../components/DashboardContent";
import { DataProvider } from "@/contexts/DataContext";
import LoggedInContent from "@/components/LoggedInContent";

export default function Dashboard() {
  return (
    <LoggedInContent>
      <DataProvider>
        <DashboardContent />
      </DataProvider>
    </LoggedInContent>
  );
}
