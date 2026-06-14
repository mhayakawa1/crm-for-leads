import AnalyticsContent from "@/components/AnalyticsContent";
import LoggedInContent from "@/components/LoggedInContent";

export default function Analytics() {
  return (
    <LoggedInContent>
      <AnalyticsContent />
    </LoggedInContent>
  );
}
