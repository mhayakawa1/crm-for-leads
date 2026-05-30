import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ColumnProps {
  title: string;
  description: string;
  leads: any;
}

export default function BoardColumn({
  title,
  description,
  leads,
}: ColumnProps) {
  return (
    <Card className="border border-gray-300 bg-white shadow-sm w-full m-auto max-w-sm h-fit">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {leads.map((lead: any) => (
            <li key={lead.id} className='border border-solid'>{lead.name}</li>
          ))}
          {!leads.length ? <li>No leads.</li> : null}
        </ul>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
