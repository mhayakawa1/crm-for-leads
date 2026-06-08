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

export default function Menu() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

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
          className="w-fit text-right bg-white border border-gray-300 p-0"
          align="end"
        >
          <DropdownMenuGroup className="flex flex-col items-end p-4">
            <DropdownMenuItem className="focus:outline-none">
              {name}
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:outline-none">
              {email}
            </DropdownMenuItem>
            <MenuNotifications />
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
