import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorProps {
  errorMessage: string;
}

export default function Error({ errorMessage }: ErrorProps) {
  return (
    <Alert className="border-none bg-red-200 text-red-500">
      <AlertCircle />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
}
