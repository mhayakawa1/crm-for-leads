"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components//ui/button";
import { useData } from "@/contexts/DataContext";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { DefaultButton } from "./DefaultButton";
import Link from "next/link";

interface FormProps {
  title: string;
  linkText: string;
  href: string;
}

interface Body {
  email: string;
  password: string;
  name?: string;
}

export default function Form({ title, linkText, href }: FormProps) {
  const { updateEndpoint } = useData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const isSignup = title === "Signup";
  const inputData = [
    {
      label: "Name",
      type: "text",
      placeholder: "First Last",
      value: name,
      onChange: setName,
    },
    {
      label: "Email",
      type: "email",
      placeholder: "email@example.com",
      value: email,
      onChange: setEmail,
    },
    {
      label: "Password",
      type: "password",
      placeholder: "",
      value: password,
      onChange: setPassword,
    },
  ];

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body: Body = {
      email: email,
      password: password,
    };
    if (isSignup) {
      body.name = name;
    }
    updateEndpoint("POST", JSON.stringify(body), "", title);
  };

  const togglePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsVisible((current: boolean) => !current);
  };

  return (
    <Card className="border border-gray-300 bg-white shadow-sm w-full m-auto max-w-sm h-fit">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-6">
            {inputData.slice(Number(!isSignup)).map((input) => {
              const { label, type, placeholder, value, onChange } = input;
              const isPassword = label === "Password";
              return (
                <div key={label} className="grid gap-2">
                  <Label htmlFor={type}>{label}</Label>
                  <div className="w-full relative">
                    <Input
                      id={type}
                      type={
                        !isPassword
                          ? type
                          : isPassword && isVisible
                            ? "text"
                            : type
                      }
                      placeholder={placeholder}
                      value={value}
                      onChange={(event: any) => onChange(event?.target.value)}
                      required
                      className="border border-gray-300"
                    />
                    {label === "Password" ? (
                      <Button
                        onClick={togglePassword}
                        className="absolute right-2"
                      >
                        {isVisible ? <Eye /> : <EyeOff />}
                      </Button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
          <DefaultButton>{title}</DefaultButton>
          <Link href={`/${href}`} className="mx-auto hover:underline">
            {linkText}
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}
