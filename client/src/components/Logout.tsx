"use client";
import { Button } from "@/components//ui/button";
import { useData } from "@/contexts/DataContext";

export default function Logout() {
  const { updateEndpoint } = useData();

  return (
    <Button
      onClick={() => updateEndpoint("POST", "", "", "logout")}
      className="w-full h-full bg-gray text-end py-2"
    >
      Logout
    </Button>
  );
}
