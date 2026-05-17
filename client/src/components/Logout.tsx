"use client";
import { useAuth } from "@/contexts/AuthContext";

export default function Logout() {
  const { submitRequest } = useAuth()
  return (
    <button
      onClick={() => submitRequest("logout")}
      className="w-full h-full bg-gray text-center pt-1 pb-2 hover:text-gray-500 focus:outline-none focus:!ring-0 focus:!border-none hover:!border-none hover:!ring-0 hover:!outline-none"
    >
      Logout
    </button>
  );
}
