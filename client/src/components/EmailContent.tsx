"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardLink from "./DashboardLink";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { DefaultButton } from "./DefaultButton";

export default function EmailsContent() {
  const [status, setStatus] = useState<string>("");
  const { user } = useAuth();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Sending...");
    const formData = new FormData(event.currentTarget);
    const payload = {
      to: formData.get("email") as string,
      from: user,
      subject: subject,
      message: message,
    };
    try {
      const response = await fetch("http://localhost:5000/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus("Email sent successfully!");
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (err) {
      setStatus("Failed to connect to the server.");
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setMessage(value);
  };

  return (
    <Card className="border border-gray-300 bg-white shadow-sm w-full m-auto max-w-sm h-fit">
      <CardHeader>
        <DashboardLink />
        <CardTitle>Emails</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "300px",
          }}
        >
          <Input
            type="email"
            name="email"
            placeholder="Recipient Email"
            required
          />
          <Input
            type="text"
            name="subject"
            value={subject}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSubject(event.target?.value)
            }
            required
          />
          <Textarea
            name="message"
            placeholder="Your Message"
            className="whitespace-pre-wrap"
            onChange={handleChange}
            value={message}
            required
          />
          <DefaultButton>Send Email</DefaultButton>
          {status && <p>{status}</p>}
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
