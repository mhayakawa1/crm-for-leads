import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { useState } from "react";

interface FilterButtonProps {
  name: string;
  value: string;
}

export default function FilterButton({ name, value }: FilterButtonProps) {
  const { updateEndpoint } = useData();
  const [isAscending, setIsAscending] = useState(true);

  return (
    <Button
      variant="ghost"
      onClick={() => {
        updateEndpoint("GET", "", "", {
          sortBy: value,
          isAscending: !isAscending,
        });
        setIsAscending((current) => !current);
      }}
      className="px-0"
    >
      {name}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
