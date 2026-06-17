import { DataProvider } from "@/contexts/DataContext";
import EmailsContent from "@/components/EmailContent";
import LoggedInContent from "@/components/LoggedInContent";

export default function Email() {
  return (
    <LoggedInContent>
      
      <DataProvider>
        <EmailsContent />
      </DataProvider>
    </LoggedInContent>
  );
}
