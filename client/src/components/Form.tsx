"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components//ui/button";
import { useData } from "@/contexts/DataContext";
import { useState } from "react";

interface FormProps {
  title: string;
}

export default function Form({ title }: FormProps) {
  const { updateEndpoint } = useData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = {
      email: email,
      password: password,
    };
    updateEndpoint("POST", JSON.stringify(body), "", title);
  };

  return (
    <Card className="border w-full m-auto max-w-sm h-fit">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(event: any) => setEmail(event?.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event: any) => setPassword(event?.target.value)}
                required
              />
            </div>
          </div>
          <Button variant="outline">{title}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
