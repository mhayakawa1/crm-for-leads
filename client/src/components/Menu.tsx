"use client";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import Logout from "./Logout";
import { MenuTrigger } from "./MenuTrigger";
import { MenuNotifications } from "./MenuNotifications";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SquareKanban, ChartLine, Mail } from "lucide-react";

export default function Menu() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const linkItems = [
    {
      key: "leads",
      name: "Lead Statuses",
      href: "/edit-statuses",
      icon: <SquareKanban />,
    },
    {
      key: "analytics",
      name: "Analytics",
      href: "/analytics",
      icon: <ChartLine />,
    },
    { key: "emails", name: "Emails", href: "/email", icon: <Mail /> },
  ];

  useEffect(() => {
    if (user) {
      const { name, email } = user;
      setEmail(email);
      setName(name);
    }
  }, [user]);

  return (
    <div className="flex justify-end w-full pt-4">
      <DropdownMenu>
        <MenuTrigger />
        <DropdownMenuContent
          className="w-82 text-left bg-white border border-gray-300 p-0"
          align="end"
        >
          <DropdownMenuGroup className="w-82 flex flex-col items-start p-4">
            <DropdownMenuItem className="focus:outline-none">
              <ul>
                <li className="font-semibold">{name}</li>
                <li>{email}</li>
              </ul>
            </DropdownMenuItem>
            <MenuNotifications />
            <span className="w-full h-[1px] bg-gray-300 my-4"></span>
            <DropdownMenuItem className="w-full flex flex-col items-start">
              {linkItems.map((item) => {
                const { key, name, href, icon } = item;
                return (
                  <Link
                    key={key}
                    href={href}
                    className="flex items-center gap-2 w-fit text-left hover:underline"
                  >
                    {icon}
                    <span>{name}</span>
                  </Link>
                );
              })}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-gray-300" />
          <DropdownMenuItem className="focus:outline-none">
            <Logout />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
