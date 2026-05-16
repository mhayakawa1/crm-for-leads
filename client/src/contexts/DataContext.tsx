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
  };
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

  useEffect(() => {
    if (makeRequest) {
      async function getData(): Promise<User[]> {
        const newUrl = `${url}${endpoint}`;
        const request: Request = {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
        };
        if (method === "POST" || method === "PUT") {
          request.body = body;
        }
        const newData = [...data];
        const index = newData.findIndex((user: User) => user.id === id);
        const response = await fetch(newUrl, request);
        const result = await response.json();
        if (result.error) {
          return result.error;
        } else if (response.ok) {
          if (method === "PUT") {
            newData.splice(index, 1, result[0]);
            setData(newData);
          } else if (method === "POST") {
            if (endpoint === "users") {
              newData.unshift(result[0]);
              setData(newData);
            }
            if (endpoint === "login") {
              localStorage.setItem("accessToken", result.token);
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
  }, [makeRequest, method, id, body, endpoint, data]);

  const updateEndpoint = (
    method: string,
    body: string,
    id: string,
    authType?: string,
  ) => {
    setMethod(method);
    setBody(body);
    setId(id);
    if (method === "PUT" || method === "DELETE") {
      setEndpoint(`users/${id}`);
    } else if (authType) {
      setEndpoint(authType.toLowerCase());
    } else if (body) {
      setEndpoint("users");
    }
    setMakeRequest(true);
  };

  return (
    <DataContext.Provider value={{ data, endpoint, updateEndpoint }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
