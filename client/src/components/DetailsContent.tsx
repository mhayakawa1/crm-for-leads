"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import { useData, Request, User, Body, Note } from "@/contexts/DataContext";
import { url } from "@/contexts/AuthContext";
import NoteContainer from "./NoteContainer";
import { DefaultButton } from "./DefaultButton";
import DashboardLink from "./DashboardLink";

export default function DetailsContent() {
  const { updateEndpoint, createDescription } = useData();
  const { user } = useAuth();
  const [id, setId] = useState("");
  const [makeRequest, setMakeRequest] = useState(true);
  const [noteInput, setNoteInput] = useState("");
  const [userData, setUserData] = useState<User>({
    id: "",
    name: "",
    email: "",
    age: 0,
    createdAt: "",
    assigned_to: { id: "", name: "", email: "" },
    status: "",
    notes: [],
    activity: [],
  });

  useEffect(() => {
    if (!id.length) {
      setId(window.location.pathname.replace("/details/", ""));
    }
    if (makeRequest && id) {
      async function getData(): Promise<User> {
        const newUrl = `${url}users/${id}`;
        const token = localStorage.getItem("accessToken") || "";
        const request: Request = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          request: { credentials: "include" },
        };
        const response = await fetch(newUrl, request);
        const result = (await response.json()) || {};
        if (!response.ok) {
          return result;
        } else if (response.ok) {
          setUserData(result);
        }
        return result;
      }
      getData();
      setMakeRequest(false);
    }
  }, [id, makeRequest, userData]);

  const editNotes = (key: string, newNote: string) => {
    const currentData = JSON.parse(JSON.stringify(userData));
    const date = new Date().toLocaleString();
    const updatedBy = user ? user.name : "";
    let newNotes = [...userData.notes];
    if (newNotes.find((note) => note.key === key)) {
      newNotes = userData.notes.map((item) => {
        if (item.key === key) {
          item.note = newNote;
          const newUpdates = [...item.updates];
          newUpdates.push({
            time: date,
            by: updatedBy,
          });
          item.updates = newUpdates;
        }
        return item;
      });
    } else {
      newNotes.push({
        key: key,
        note: newNote,
        updates: [{ time: date, by: updatedBy }],
      });
    }
    const newData = { ...userData };
    newData.notes = newNotes;
    setUserData(newData);
    const body: Body = {
      notes: newNotes,
    };

    if (user) {
      const newActions = createDescription(user, currentData, body);
      body.activity = [newActions, ...userData.activity];
      updateEndpoint("PUT", JSON.stringify(body), id);
    }
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (noteInput.length) {
      const newKey = crypto.randomUUID();
      editNotes(newKey, noteInput);
      setNoteInput("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteInput(event.target.value);
  };

  return (
    <Card className="border border-gray-300 bg-white shadow-sm w-full m-auto max-w-sm h-fit">
      <CardHeader>
        <DashboardLink />
        <CardTitle>{userData.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {Object.entries(userData)
            .slice(2, 6)
            .map((entry) => {
              const [key, value] = entry;
              return (
                <li key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
                  :
                  {key === "assigned_to"
                    ? `${userData.assigned_to.name} (${userData.assigned_to.email})`
                    : value?.toString()}
                </li>
              );
            })}
        </ul>
        <div>
          <h2>Notes</h2>
          <form onSubmit={handleSubmit}>
            <h3>Add Note</h3>
            <Textarea
              onChange={handleChange}
              value={noteInput}
              placeholder="Enter text..."
            />
            <DefaultButton>+</DefaultButton>
          </form>
          <ul>
            {userData.notes.map((item: Note) => {
              return (
                <NoteContainer
                  key={item.key}
                  item={item}
                  editNotes={editNotes}
                />
              );
            })}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
