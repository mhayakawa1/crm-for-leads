import { DataProvider } from "@/contexts/DataContext";
import EmailsContent from "@/components/EmailContent";
import { RemindersProvider } from "@/contexts/RemindersContext";
import Menu from "@/components/Menu";

export default function Email() {
  return (
    <RemindersProvider>
      <div className="h-full w-full max-w-screen-md flex flex-col gap-2 container px-4 box-border">
        <Menu />
        <DataProvider>
          <EmailsContent />
        </DataProvider>
      </div>
    </RemindersProvider>
  );
}
