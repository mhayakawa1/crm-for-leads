import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorProps {
  errorMessage: string;
}

export default function Error({ errorMessage }: ErrorProps) {
  return (
    <Alert className="border-none flex flex-col gap-2 items-center bg-red-200 text-red-500">
      <div className="flex justify-center gap-1 items-end">
        <AlertCircle />
        <AlertTitle>Error</AlertTitle>
      </div>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
}
