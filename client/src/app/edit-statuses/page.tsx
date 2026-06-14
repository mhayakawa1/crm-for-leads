import EditStatusesContent from "@/components/EditStatusesContent";
import { DataProvider } from "@/contexts/DataContext";
import LoggedInContent from "@/components/LoggedInContent";

export default function EditStatuses() {
  return (
    <LoggedInContent>
      <DataProvider>
        <EditStatusesContent />
      </DataProvider>
    </LoggedInContent>
  );
}
