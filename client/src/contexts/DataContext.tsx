"use client";
import { useRouter } from "next/navigation";
import { Profile } from "./AuthContext";
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
  profiles: Profile[];
  endpoint: string;
  updateEndpoint: (
    method: string,
    body: string,
    id: string,
    filter?: Filters,
  ) => void;
  createDescription: (user: Profile, data: User, body: Body) => Action;
}

export interface Update {
  time: string;
  by: string;
}

export interface Note {
  key: string;
  note: string;
  updates: Update[];
}

export interface Action {
  id: string;
  time: string;
  user: Profile;
  descriptions: (string | undefined)[];
}

export type AssignedTo = {
  id: string;
  name: string;
  email: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  age: number;
  created_at: string;
  assigned_to: AssignedTo;
  status: string;
  notes: Note[];
  activity: Action[];
};

export interface Body {
  name?: string;
  email?: string;
  status?: string;
  assigned_to?: AssignedTo;
  password?: string;
  notes?: Note[];
  activity?: Action[];
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

export interface Filters {
  name?: string;
  email?: string;
  status?: string;
  isAscending?: boolean;
  [key: string]: string | boolean | undefined;
}

const DataContext = createContext<ContextData | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [data, setData] = useState<User[]>([]);
  const [requestProfiles, setRequestProfiles] = useState(true);
  const [requestData, setRequestData] = useState(true);
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
    sortBy: "name",
    isAscending: true,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken") || "";
    const request: Request = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      request: { credentials: "include" },
    };
    if (user && token) {
      if (requestProfiles) {
        async function getProfiles(): Promise<Profile[]> {
          const newUrl = `${url}profiles`;
          try {
            const response = await fetch(newUrl, request);
            const result = (await response.json()) || {};
            if (response.ok) {
              setProfiles(result);
            }
            return result;
          } catch {
            return [];
          }
        }
        getProfiles();
        setRequestProfiles(false);
      }
      if (requestData) {
        async function getData(): Promise<User[]> {
          let newUrl = `${url}${endpoint}`;
          if (method !== "PUT" && method !== "POST") {
            newUrl += `&assigned_id=${JSON.parse(user || "").sub}`;
          }
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
        setRequestData(false);
      }
    } else {
      router.push("/login");
    }
  }, [
    requestData,
    requestProfiles,
    profiles,
    method,
    id,
    body,
    endpoint,
    data,
  ]);

  const updateEndpoint = (
    method: string,
    body: string,
    id: string,
    filter?: Filters,
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
    setRequestData(true);
  };

  function createDescription(user: Profile, data: User, body: Body) {
    const time = new Date().toLocaleString();
    const descriptions = Object.entries(body)
      .map((entry) => {
        const [key, value] = entry;
        const dataValue = data[key as keyof typeof data];
        if (dataValue !== value) {
          if (key === "notes") {
            for (let i = 0; i < value.length; i++) {
              const { key, note } = value[i];
              const preexistingNote = data.notes.find(
                (note: Note) => note.key === key,
              );
              if (!preexistingNote) {
                return `added note: ${note}`;
              } else if (preexistingNote.note !== note) {
                return `edited note: ${note}`;
              }
            }
          } else if (key === "assigned_to") {
            return `reassigned lead from ${(dataValue as AssignedTo).name} to ${value.name}`;
          } else {
            return `changed ${key} from ${dataValue} to ${value}`;
          }
        }
      })
      .filter((element) => element);
    return {
      id: crypto.randomUUID(),
      time: time,
      user: user,
      descriptions: descriptions,
    };
  }

  return (
    <DataContext.Provider
      value={{ data, profiles, endpoint, updateEndpoint, createDescription }}
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
