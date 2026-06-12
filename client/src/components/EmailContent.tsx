"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useData } from "@/contexts/DataContext";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import DashboardLink from "./DashboardLink";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { DefaultButton } from "./DefaultButton";

interface Template {
  type: string;
  subject: string;
  message: string;
}

export default function EmailsContent() {
  const [status, setStatus] = useState<string>("");
  const { user } = useAuth();
  const { profiles } = useData();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const templates = [
    {
      type: "Initial Outreach",
      subject: "Introduction",
      message:
        "Hi [First Name],\n\nI hope you're doing well. I came across your information and wanted to introduce myself. We help businesses like yours improve.\n\nI'd love to learn more about your current goals and see if we might be able to help. Would you be available for a brief conversation this week?\n\nLooking forward to hearing from you.\n\nBest regards,\n[Your Name]\n[Company Name]",
    },
    {
      type: "Follow-Up",
      subject: "Following Up",
      message:
        "Hi [First Name],\n\nI wanted to follow up on my previous email.\n\nI understand things can get busy, but I'd be happy to answer any questions or provide additional information if needed.\n\nWould you be interested in a quick discussion to explore how we can help?\n\nThank you for your time.\n\nBest regards,\n[Your Name]\n[Company Name]",
    },
    {
      type: "Re-Engagement",
      subject: "Still Interested?",
      message:
        "Hi [First Name],\n\nIt's been a little while since we last connected, so I wanted to check in.\n\nIf it's still a priority, I'd be happy to discuss how we can support your efforts. If now isn't the right time, no worries. Feel free to reach out whenever it works for you.\n\nThank you, and I hope to hear from you soon.\n\nBest regards,\n[Your Name]\n[Company Name]",
    },
  ];

  async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Sending...");
    const formData = new FormData(event.currentTarget);
    const profile = profiles.find((item) => item.sub === user.sub);
    const email = {
      to: formData.get("email") as string,
      from: user,
      subject: subject,
      message: message,
    };
    const payload = {
      email: email,
      email_history: profile ? [...profile.email_history] : [],
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

  const useTemplate = (template: Template) => {
    const { subject, message } = template;
    setSubject(subject);
    setMessage(message);
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
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button>
                Email Templates
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-gray-300 shadow-sm">
              <form onSubmit={(event) => event.preventDefault()}>
                {templates.map((template) => (
                  <DropdownMenuItem
                    key={template.subject}
                    onClick={() => useTemplate(template)}
                    className="hover:bg-gray-300"
                  >
                    {template.type}
                  </DropdownMenuItem>
                ))}
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            type="text"
            name="subject"
            placeholder="Your Subject"
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
