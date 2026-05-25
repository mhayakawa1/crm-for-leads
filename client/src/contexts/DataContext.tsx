"use client";
import { useRouter } from "next/navigation";
import { url } from "./AuthContext";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface ContextData {
  data: User[];
  endpoint: string;
  updateEndpoint: (
    method: string,
    body: string,
    id: string,
    filter?: any,
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
    Authorization: string;
  };
  request?: { credentials: string };
  body?: string;
}

interface Filters {
  name: string;
  email: string;
  status: string;
  assigned_to: string;
  sortBy: string;
  isAscending: boolean;
  [key: string]: string | boolean | undefined;
}

const DataContext = createContext<ContextData | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [data, setData] = useState<User[]>([]);
  const [makeRequest, setMakeRequest] = useState(true);
  const [endpoint, setEndpoint] = useState(
    "users?sortBy=name&isAscending=true",
  );
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [id, setId] = useState("");
  const [filters, setFilters] = useState<Filters>({
    name: "",
    email: "",
    status: "",
    assigned_to: "",
    sortBy: "name",
    isAscending: true,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");
    if (user && token) {
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
            request: { credentials: "include" },
          };
          if (method === "POST" || method === "PUT") {
            request.body = body;
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
              newData.unshift(result[0]);
              setData(newData);
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
    } else {
      router.push("/login");
    }
  }, [makeRequest, method, id, body, endpoint, data]);

  const updateEndpoint = (
    method: string,
    body: string,
    id: string,
    filter?: string,
  ) => {
    setMethod(method);
    setBody(body);
    setId(id);
    if (method === "PUT" || method === "DELETE") {
      setEndpoint(`users/${id}`);
    } else if (filter) {
      const newFilters = { ...filters };
      Object.entries(filter).map((entry) => {
        const [key, value] = entry;
        newFilters[key] = value;
      });
      setFilters(newFilters);
      let filterEndpoint = "users?";
      Object.entries(newFilters)
        .filter((entry) => entry[1] !== "")
        .forEach((entry, index) => {
          return (filterEndpoint =
            filterEndpoint +
            `${index !== 0 ? "&" : ""}${entry[0]}=${entry[1]}`);
        });
      setEndpoint(filterEndpoint);
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
