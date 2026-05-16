import DashboardContent from "./../../components/DashboardContent";

export default async function Dashboard() {
  return (
    <div className="flex flex-col gap-2 container mx-auto py-10 px-4 border border-solid box-border">
      <DashboardContent />
    </div>
  );
}
