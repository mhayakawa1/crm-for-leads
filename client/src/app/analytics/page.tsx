import Menu from "@/components/Menu";
import AnalyticsContent from "@/components/AnalyticsContent";
import { RemindersProvider } from "@/contexts/RemindersContext";

export default function Analytics() {
  return (
    <RemindersProvider>
      <div className="h-full w-full max-w-screen-md flex flex-col gap-2 container px-4 box-border">
        <Menu />
        <AnalyticsContent />
      </div>
    </RemindersProvider>
  );
}
