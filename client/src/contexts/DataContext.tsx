"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";

export interface ContextData {
  data: User[];
  endpoint: string;
  updateEndpoint: (
    method: string,
    body: string,
    id: string,
    authType?: string,
  ) => void;
  hasLoggedIn: boolean;
}

export type User = {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt: string;
  assigned_to: string | null;
  status: string;
};

export interface Body {
  name?: string;
  email: string;
  status?: string;
  assigned_to?: string;
  password?: string;
}

export interface Request {
  method: string;
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
  request?: { credentials: string };
  body?: string;
}

export const url = "http://localhost:5000/api/";

const DataContext = createContext<ContextData | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [data, setData] = useState<User[]>([]);
  const [makeRequest, setMakeRequest] = useState(true);
  const [endpoint, setEndpoint] = useState("users");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [id, setId] = useState("");
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  useEffect(() => {
    if (makeRequest) {
      async function getData(): Promise<User[]> {
        const newUrl = `${url}${endpoint}`;
        const token = localStorage.getItem("accessToken") || "";
        const request: Request = {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        };
        const isAuthRoute =
          endpoint === "login" ||
          endpoint === "signup" ||
          endpoint === "logout";
        if (method === "POST" || method === "PUT") {
          request.body = body;
        }
        if (!isAuthRoute) {
          request.request = { credentials: "include" };
        }
        const newData = [...data];
        const index = newData.findIndex((user: User) => user.id === id);
        const response = await fetch(newUrl, request);
        const result = (await response.json()) || {};

        if (!response.ok) {
          return result;
        } else if (response.ok) {
          if (method === "PUT") {
            newData.splice(index, 1, result[0]);
            setData(newData);
          } else if (method === "POST") {
            if (endpoint === "users") {
              newData.unshift(result[0]);
              setData(newData);
            } else if (endpoint === "login") {
              localStorage.setItem("accessToken", result.accessToken);
              setEndpoint("users");
              setHasLoggedIn(true);
              router.push("/dashboard");
            } else if (endpoint === "signup") {
              router.push("/login");
            } else if (endpoint === "logout") {
              localStorage.clear();
              router.push("/login");
            }
          } else if (method === "GET") {
            setData(result);
          } else if (method === "DELETE") {
            newData.splice(index, 1);
            setData(newData);
          }
        }
        return result;
      }
      getData();
      setMakeRequest(false);
    }
    if (hasLoggedIn) {
      setHasLoggedIn(false);
      setMakeRequest(true);
      setMethod("GET");
      setEndpoint("users");
    }
  }, [makeRequest, method, id, body, endpoint, hasLoggedIn, data]);

  const updateEndpoint = (
    method: string,
    body: string,
    id: string,
    authType?: string,
  ) => {
    setMethod(method);
    setBody(body);
    setId(id);
    let newEndpoint = "";
    if (method === "PUT" || method === "DELETE") {
      newEndpoint = `users/${id}`;
      setEndpoint(newEndpoint);
    } else if (authType) {
      newEndpoint = authType.toLowerCase();
      setEndpoint(newEndpoint);
    } else if (body) {
      newEndpoint = "users";
      setEndpoint(newEndpoint);
    }
    setMakeRequest(true);
  };

  return (
    <DataContext.Provider
      value={{ data, endpoint, updateEndpoint, hasLoggedIn }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
