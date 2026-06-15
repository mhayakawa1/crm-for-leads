import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { Note } from "@/contexts/DataContext";

interface NoteProps {
  item: Note;
  editNotes: (key: string, newNote: string) => void;
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
    <li className="border border-gray-300 shadow-sm rounded-lg p-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="w-full rounded-lg bg-gray-200">
          {canEdit ? (
            <Textarea
              value={editedNote}
              onChange={handleChange}
              className="w-full min-h-20 overflow-y-scroll"
            />
          ) : (
            <p className="p-2 min-h-20">{editedNote}</p>
          )}
        </div>
        <ul>
          <li>
            <span className="font-semibold">Created at: </span>
            {updates[0] ? updates[0].time : ""}
          </li>
          <li>
            <span className="font-semibold">Last updated: </span>
            {updates[0] ? updates[updates.length - 1].time : ""}
          </li>
        </ul>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            onClick={toggleEdit}
            variant="outline"
            className="w-16"
          >
            Edit
          </Button>
          <Button
            onClick={toggleEdit}
            variant="outline"
            className={`w-16 ${canEdit ? "" : "pointer-events-none opacity-50"}`}
          >
            Save
          </Button>
        </div>
      </form>
    </li>
  );
}
