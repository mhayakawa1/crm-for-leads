import { User } from "./columns";
import DashboardContent from "./../../components/DashboardContent";

async function getData(): Promise<User[]> {
  const url = "http://localhost:5000/api/users";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch {
    return [];
  }
}
export default async function Dashboard() {
  const data = await getData();
  return (
    <div className="flex flex-col gap-2 container mx-auto py-10 px-4 border border-solid box-border">
      <DashboardContent data={data} />
    </div>
  );
}
