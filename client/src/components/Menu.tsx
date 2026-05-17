"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import Logout from "./Logout";
import { Button } from "./ui/button";
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
        <DropdownMenuTrigger asChild>
          <Button className="p-0 rounded-full w-fit">
            <Avatar>
              <AvatarImage src="" alt="@shadcn" className="grayscale" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
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
