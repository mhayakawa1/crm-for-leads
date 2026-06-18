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
import { DefaultButton } from "./DefaultButton";
import { Label } from "./ui/label";
import { InputContainer } from "./InputContainer";

interface Template {
  type: string;
  subject: string;
  message: string;
}

export default function EmailsContent() {
  const [status, setStatus] = useState<string>("");
  const { user } = useAuth();
  const { profiles } = useData();
  const [emailAddress, setEmailAddress] = useState("");
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
    const profile = profiles.find((item) => item.sub === user.sub);
    const email = {
      to: emailAddress,
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

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { id, value } = event.target;
    if (id === "email") {
      setEmailAddress(value);
    } else if (id === "subject") {
      setSubject(value);
    } else if (id === "message") {
      setMessage(value);
    }
  };

  const useTemplate = (template: Template) => {
    const { subject, message } = template;
    setSubject(subject);
    setMessage(message);
  };

  return (
    <div className="flex flex-col gap-4 pb-10">
      <DashboardLink />
      <Card className="border border-gray-300 bg-white shadow-sm w-full m-auto max-w-sm h-fit">
        <CardHeader>
          <CardTitle>Send an Email</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-1 w-full">
            <InputContainer
              type="email"
              label="Email"
              placeholder="Recipient Email"
              onChange={handleChange}
              value={emailAddress}
            />
            <div className="py-2 text-sm flex flex-col gap-2">
              <Label htmlFor="templates">Email Templates</Label>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild className="border border-gray-300">
                  <Button className="flex justify-between">
                    Choose a Template (Optional)
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border border-gray-300 shadow-sm w-[--radix-dropdown-menu-trigger-width]">
                  <form
                    onSubmit={(event) => event.preventDefault()}
                    id="templates"
                  >
                    {templates.map((template) => (
                      <DropdownMenuItem
                        key={template.subject}
                        onClick={() => useTemplate(template)}
                        className="hover:bg-gray-200"
                      >
                        {template.type}
                      </DropdownMenuItem>
                    ))}
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <InputContainer
              type="text"
              label="Subject"
              placeholder="Your Subject"
              onChange={handleChange}
              value={subject}
            />
            <InputContainer
              type="textarea"
              label="Message"
              placeholder="Your Message"
              onChange={handleChange}
              value={message}
            />
            <DefaultButton>Send Email</DefaultButton>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {status && <p>{status}</p>}
        </CardFooter>
      </Card>
    </div>
  );
}
