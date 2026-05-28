"use client";
import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useData } from "@/contexts/DataContext";

interface InputProps {
  filterBy: string;
  value: string;
}

export function FilterInput({ filterBy, value }: InputProps) {
  const { updateEndpoint } = useData();
  const [inputValue, setInputValue] = useState("");

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const query = {
        [filterBy]: inputValue,
      };
      updateEndpoint("GET", "", "", query);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Input
      placeholder={`Filter by ${filterBy.toLowerCase().replace("_", " ")}...`}
      value={inputValue}
      onKeyDown={onKeyDown}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        handleChange(event)
      }
      className="max-w-sm grow-1 border border-gray-300"
    />
  );
}
