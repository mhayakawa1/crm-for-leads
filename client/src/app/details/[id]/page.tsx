import { DataProvider } from "@/contexts/DataContext";
import DetailsContent from "@/components/DetailsContent";
import LoggedInContent from "@/components/LoggedInContent";

export default function Details() {
  return (
    <LoggedInContent>
      <DataProvider>
        <DetailsContent />
      </DataProvider>
    </LoggedInContent>
  );
}
