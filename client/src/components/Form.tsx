"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components//ui/button";
import Error from "./Error";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
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
  const { submitRequest, isSuccessful, errorMessage } = useAuth();
  const router = useRouter();
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
    submitRequest(title, body);
  };

  const togglePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsVisible((current: boolean) => !current);
  };

  const goToLogin = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/login");
  };

  return (
    <Card className="border border-gray-300 bg-white shadow-sm w-full m-auto max-w-sm h-fit">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {errorMessage ? <Error errorMessage={errorMessage} /> : null}
        <form
          onSubmit={handleSubmit}
          className={`${isSuccessful && isSignup ? "pointer-events-none opacity-50" : ""} flex flex-col gap-4`}
        >
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
        </form>{" "}
        {isSuccessful && isSignup ? (
          <form
            onSubmit={goToLogin}
            className="w-full flex flex-col gap-2 items-center py-2"
          >
            <CheckCircle size={50} />
            <p>Success!</p>
            <DefaultButton className="w-full flex items-center p-0">
              Continue
            </DefaultButton>
          </form>
        ) : (
          <Link
            href={`/${href}`}
            className="mx-auto text-center hover:underline"
          >
            {linkText}
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
