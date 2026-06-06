import Menu from "@/components/Menu";
import AnalyticsContent from "@/components/AnalyticsContent";

export default function Analytics() {
  return (
    <div className="h-full w-full max-w-screen-md flex flex-col gap-2 container px-4 box-border">
      <Menu />
      <AnalyticsContent />
    </div>
  );
}
