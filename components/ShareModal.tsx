"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type User = { id: string; email: string };

type ShareModalProps = {
  documentId: string;
  onClose: () => void;
};

export default function ShareModal({ documentId, onClose }: ShareModalProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [sharing, setSharing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch(() => setMessage("Failed to load users"));
  }, []);

  async function handleShare() {
    if (!selectedEmail) return;

    setSharing(true);
    setMessage("");

    try {
      const res = await fetch(`/api/documents/${documentId}/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: selectedEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error ?? "Failed to share");
        return;
      }

      setMessage(`Shared with ${selectedEmail}`);
      setSelectedEmail("");
    } finally {
      setSharing(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Share Document</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <label className="mb-2 block text-sm font-medium text-gray-700">
          Share with
        </label>
        <select
          value={selectedEmail}
          onChange={(e) => setSelectedEmail(e.target.value)}
          className="mb-4 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.email}>
              {user.email}
            </option>
          ))}
        </select>

        <button
          type="button"
          disabled={!selectedEmail || sharing}
          onClick={handleShare}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {sharing ? "Sharing..." : "Grant Access"}
        </button>

        {message && (
          <p className="mt-3 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
}
