"use client";
import { useMemo } from "react";
import Login from "../login/page";
import Signup from "./../signup/page";
import Error from "./../error/page";
import Dashboard from "./../dashboard/page";
export default function PageClient({ initialPath }: { initialPath: string }) {
  const ActiveComponent =
    useMemo(() => {
      switch (initialPath) {
        case "/dashboard":
          return Dashboard;
        case "/login":
          return Login;
        case "/signup":
          return Signup;
        default:
          return Error;
      }
    }, [initialPath]) || (() => null);

  return (
    <div>
      <ActiveComponent />
    </div>
  );
}
