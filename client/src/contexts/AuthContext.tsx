"use client";
import { useRouter } from "next/navigation";
import { Body, User } from "./DataContext";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Profile {
  email: string;
  email_verified: boolean;
  name: string;
  phone_verified: boolean;
  sub: string;
}

export interface ContextData {
  user: Profile;
  submitRequest: (requestType: string, body?: Body | null) => void;
  isSuccessful: boolean;
  errorMessage: string;
}

export interface Request {
  method: string;
  headers: {
    "Content-Type": string;
  };
  body?: string;
}

export const url = "http://localhost:5000/api/";

const AuthContext = createContext<ContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    email_verified: true,
    name: "",
    phone_verified: true,
    sub: "",
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [body, setBody] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (hasSubmitted) {
      async function callApi(): Promise<User[]> {
        const newUrl = `${url}${endpoint}`;
        const request: Request = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        };
        try {
          const response = await fetch(newUrl, request);
          const result = (await response.json()) || {};
          if (response.ok) {
            setErrorMessage("");
            if (endpoint === "login") {
              localStorage.setItem("accessToken", result.accessToken);
              localStorage.setItem("user", JSON.stringify(result.user));
              setUser(result.user);
              router.push("/dashboard");
            } else if (endpoint === "signup") {
              setIsSuccessful(true);
            } else if (endpoint === "logout") {
              localStorage.removeItem("user");
              localStorage.removeItem("accessToken");
              router.push("/login");
            }
          } else if (result.error) {
            setErrorMessage(result.error);
          }
          return result;
        } catch {
          setErrorMessage("Server unresponsive");
          return [];
        }
      }
      callApi();
      setHasSubmitted(false);
    }
    const userItem = localStorage.getItem("user");
    if (userItem && !user.sub) {
      setUser(JSON.parse(userItem));
    }
  }, [hasSubmitted, endpoint]);

  const submitRequest = (requestType: string, body?: Body | null) => {
    setHasSubmitted(true);
    setEndpoint(requestType.toLowerCase());
    setBody(JSON.stringify(body));
  };

  return (
    <AuthContext.Provider
      value={{ user, submitRequest, isSuccessful, errorMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a DataProvider");
  return context;
};
