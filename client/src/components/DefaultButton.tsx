import React from "react";
import { Button } from "./ui/button";

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

export const DefaultButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, id, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        id={id}
        variant="outline"
        className={`border hover:border-gray-500 bg-gray-100 hover:bg-white hover:text-gray-500 ${className}`}
        {...props}
      >
        {children}
      </Button>
    );
  },
);
