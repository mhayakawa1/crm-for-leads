"use client";
import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DefaultButton } from "@/components/DefaultButton";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function Error() {
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nativeEvent = event.nativeEvent as SubmitEvent;
    const clickedButton = nativeEvent.submitter as HTMLButtonElement | null;

    if (clickedButton) {
      const buttonId = clickedButton.id;
      router.push(buttonId);
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <Empty className="border border-solid border-gray-300 bg-white max-w-fit m-auto shadow-sm">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <TriangleAlert className="size-max" />
          </EmptyMedia>
          <EmptyTitle>Error</EmptyTitle>
          <EmptyDescription>This page does not exist.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <form onSubmit={handleSubmit} className="flex justify-center gap-4">
            <Button id="login">Login</Button>
            <DefaultButton id="dashboard">Dashboard</DefaultButton>
          </form>
        </EmptyContent>
      </Empty>
    </div>
  );
}
