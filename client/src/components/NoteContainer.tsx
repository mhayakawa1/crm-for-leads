import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { Note } from "@/contexts/DataContext";

interface NoteProps {
  item: Note;
  editNotes: any;
}

export default function NoteContainer({ item, editNotes }: NoteProps) {
  const { key, note, updates } = item;
  const [editedNote, setEditedNote] = useState(note);
  const [canEdit, setCanEdit] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedNote(event.target.value);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editedNote !== note) {
      editNotes(key, editedNote);
    }
  };

  const toggleEdit = () => {
    setCanEdit((current) => !current);
  };

  return (
    <li className="flex flex-col">
      <ul>
        <li>Created at: {updates[0].time}</li>
        <li>Last updated: {updates[updates.length - 1].time}</li>
      </ul>
      <form onSubmit={handleSubmit}>
        <div className="w-full">
          {canEdit ? (
            <Textarea
              value={editedNote}
              onChange={handleChange}
              className="w-full bg-gray-200 shadow-sm"
            />
          ) : (
            <p className="w-full bg-gray-200 rounded-lg min-h-10 p-2">
              {editedNote}
            </p>
          )}
        </div>
        <div>
          <Button type="button" onClick={toggleEdit}>
            Edit
          </Button>
          <Button
            onClick={toggleEdit}
            className={`${canEdit ? "" : "pointer-events-none opacity-50"}`}
          >
            Save
          </Button>
        </div>
      </form>
    </li>
  );
}
