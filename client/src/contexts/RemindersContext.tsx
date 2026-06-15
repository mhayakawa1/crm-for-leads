"use client";
import { url } from "./AuthContext";
import { Request } from "./DataContext";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Reminder = {
  id: string;
  time: string;
  text: string;
  upcoming: boolean;
  overdue: boolean;
  completed: boolean;
};

export interface ContextData {
  options: Intl.DateTimeFormatOptions;
  today: string;
  remindersList: Reminder[];
  updateReminders: (method: string, body: string) => void;
  activeReminders: number;
}

const RemindersContext = createContext<ContextData | undefined>(undefined);

export function RemindersProvider({ children }: { children: ReactNode }) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const time = new Date().toLocaleString("en-US", options);
  const [today, setToday] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [makeRequest, setMakeRequest] = useState(true);
  const [remindersList, setRemindersList] = useState<Reminder[]>([]);
  const [activeReminders, setActiveReminders] = useState<number>(0);

  const checkTimeDifference = (reminderTime: string, currentTime: string) => {
    const date1: any = new Date(reminderTime.replace(",", ""));
    const date2: any = new Date(currentTime.replace(",", ""));

    const minutesDifference = date2 - date1;
    const hoursDifference = Math.floor(minutesDifference / (1000 * 60 * 60));

    return hoursDifference >= 24;
  };

  const findOverdueReminders = (reminders: Reminder[]) => {
    return reminders.map((reminder: Reminder) => {
      const isOverdue = checkTimeDifference(reminder.time, time);
      reminder.overdue = isOverdue && !reminder.completed;
      return reminder;
    });
  };

  const updateReminders = (method: string, body: string) => {
    const newBody = JSON.parse(body);
    const newReminders = findOverdueReminders(newBody.reminders);
    newBody.reminders = newReminders;
    setMethod(method);
    setBody(JSON.stringify(newBody));
    setMakeRequest(true);
  };

  const updateNotifications = () => {
    const newActiveReminders = remindersList.filter(
      (reminder) => reminder.time <= time && !reminder.completed,
    );
    setActiveReminders(newActiveReminders.length);
  };

  useEffect(() => {
    if (makeRequest) {
      const date = new Date();
      const day = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        .toISOString()
        .slice(0, 10);
      setToday(day);

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
      if (method === "PUT") {
        request.body = body;
      }
      async function getData(): Promise<Reminder[]> {
        const newUrl = `${url}reminders/${user ? JSON.parse(user).sub : ""}`;
        try {
          const response = await fetch(newUrl, request);
          const result = (await response.json()) || {};
          if (response.ok) {
            if (method === "GET") {
              setRemindersList(findOverdueReminders(result.reminders));
            } else {
              setRemindersList(findOverdueReminders(result[0].reminders));
            }
          }
          return result;
        } catch (error) {
          return [];
        }
      }
      getData();
      setMakeRequest(false);
    }

    if (remindersList) {
      updateNotifications();
    }
    const timer = setInterval(() => {
      updateReminders("PUT", JSON.stringify({ reminders: remindersList }));
    }, 60000);
    return () => clearInterval(timer);
  }, [
    today,
    activeReminders,
    remindersList,
    setRemindersList,
    makeRequest,
    updateNotifications,
  ]);

  return (
    <RemindersContext.Provider
      value={{
        options,
        today,
        remindersList,
        updateReminders,
        activeReminders,
      }}
    >
      {children}
    </RemindersContext.Provider>
  );
}

export const useReminders = () => {
  const context = useContext(RemindersContext);
  if (!context)
    throw new Error("useReminders must be used within a DataProvider");
  return context;
};
