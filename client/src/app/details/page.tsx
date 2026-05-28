import { DataProvider } from "@/contexts/DataContext";
import DetailsContent from "@/components/DetailsContent";

export default function Details() {
  return (
    <DataProvider>
      <DetailsContent />
    </DataProvider>
  );
}
