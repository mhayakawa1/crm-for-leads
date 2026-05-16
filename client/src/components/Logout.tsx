"use client";
import { Button } from "@/components//ui/button";
import { useData } from "@/contexts/DataContext";

export default function Logout() {
  const { updateEndpoint } = useData();

  const handleSubmit = () => {
    updateEndpoint("POST", "", "", "logout");
  };

  return (
    <Button onClick={handleSubmit} variant="outline">
      Logout
    </Button>
  );
}
