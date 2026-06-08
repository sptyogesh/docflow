"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Share2, Save, ArrowLeft } from "lucide-react";
import Editor from "@/components/Editor";
import ShareModal from "@/components/ShareModal";

export default function DocumentPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session } = useSession();

  const [title, setTitle] = useState("Untitled Document");
  const [content, setContent] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/documents/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((doc) => {
        setTitle(doc.title);
        setContent(doc.content);
        setOwnerId(doc.ownerId);
      })
      .catch(() => router.push("/dashboard"))
      .finally(() => setLoading(false));
  }, [id, router]);

  async function handleSave() {
    setSaving(true);
    setSaved(false);

    const res = await fetch(`/api/documents/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    setSaving(false);
    if (res.ok) setSaved(true);
  }

  async function handleTitleBlur() {
    setEditingTitle(false);
    await handleSave();
  }

  const isOwner = session?.user?.id === ownerId;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        Loading document...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="rounded p-1 text-gray-500 hover:bg-gray-100"
            >
              <ArrowLeft size={20} />
            </button>

            {editingTitle ? (
              <input
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleBlur}
                onKeyDown={(e) => e.key === "Enter" && handleTitleBlur()}
                className="min-w-0 flex-1 border-b-2 border-blue-500 bg-transparent text-xl font-semibold text-gray-900 outline-none"
              />
            ) : (
              <button
                type="button"
                onClick={() => setEditingTitle(true)}
                className="truncate text-left text-xl font-semibold text-gray-900 hover:text-blue-600"
              >
                {title}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isOwner && (
              <button
                type="button"
                onClick={() => setShowShare(true)}
                className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Share2 size={16} />
                Share
              </button>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? "Saving..." : saved ? "Saved!" : "Save"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-6">
        <Editor content={content} onChange={setContent} />
      </div>

      {showShare && (
        <ShareModal documentId={id} onClose={() => setShowShare(false)} />
      )}
    </div>
  );
}
