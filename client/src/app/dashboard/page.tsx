import Menu from "@/components/Menu";
import DashboardContent from "./../../components/DashboardContent";

export default async function Dashboard() {
  return (
    <div className="h-full w-full flex flex-col gap-2 container px-4 border border-solid box-border">
      <Menu />
      <DashboardContent />
    </div>
  );
}
