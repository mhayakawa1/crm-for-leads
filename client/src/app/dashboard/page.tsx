import Menu from "@/components/Menu";
import DashboardContent from "./../../components/DashboardContent";

export default async function Dashboard() {
  return (
    <div className="h-full w-full max-w-screen-md flex flex-col gap-2 container px-4 box-border">
      <Menu />
      <DashboardContent />
    </div>
  );
}
