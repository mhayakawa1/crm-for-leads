import { DataProvider } from "@/contexts/DataContext";
import DetailsContent from "@/components/DetailsContent";
import { RemindersProvider } from "@/contexts/RemindersContext";
import Menu from "@/components/Menu";

export default function Details() {
  return (
    <RemindersProvider>
      <div className="h-full w-full max-w-screen-md flex flex-col gap-2 container px-4 box-border">
        <Menu />
        <DataProvider>
          <DetailsContent />
        </DataProvider>
      </div>
    </RemindersProvider>
  );
}
