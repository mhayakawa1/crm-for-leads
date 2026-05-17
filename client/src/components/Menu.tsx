"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Logout from "./Logout";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
export default function Menu() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const storageItem = localStorage.getItem("user");
    if (storageItem) {
      const { name, email } = JSON.parse(storageItem);
      setEmail(email);
      setName(name);
    }
  }, []);

  return (
    <div className="flex justify-end w-full">
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
          className="w-fit text-right bg-white border p-0"
          align="end"
        >
          <DropdownMenuGroup className="flex flex-col items-end p-4">
            <DropdownMenuItem>{name}</DropdownMenuItem>
            <DropdownMenuItem>{email}</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-gray-300" />
          <DropdownMenuItem className="flex flex-col items-end p-0">
            <Logout />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
