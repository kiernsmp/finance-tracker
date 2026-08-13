import { useState } from "react";

interface NotesCellProps {
    value: string;
    onSave: (note: string) => void;
}

export default function NotesCell({
    value,
    onSave,
}: NotesCellProps) {
    const [editing, setEditing] = useState(false);
    const [note, setNote] = useState(value ?? "");
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (note === (value ?? "")) {
            setEditing(false);
            return;
        }

        setSaving(true);

        try {
            await onSave(note);
            setEditing(false);
        } finally {
            setSaving(false);
        }
    };

    if (editing) {
        return (
            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSave();
                    }
                }}
                autoFocus
                disabled={saving}
                rows={5}
            />
        );
    }

    return (
        <div
            className="notes-cell-content"
            onClick={() => setEditing(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setEditing(true);
                }
            }}
        >
            {value || " "}
        </div>
    );
}
