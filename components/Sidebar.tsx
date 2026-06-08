"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, FileText, Users, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import UploadButton from "./UploadButton";

type SidebarProps = {
  onNewDocument: () => void;
  onUploadComplete: (documentId: string) => void;
};

export default function Sidebar({
  onNewDocument,
  onUploadComplete,
}: SidebarProps) {
  const pathname = usePathname();
  const filter = pathname.includes("shared") ? "shared" : "mine";

  return (
    <aside className="flex w-64 flex-col border-r border-gray-200 bg-gray-50">
      <div className="border-b border-gray-200 p-4">
        <h1 className="text-lg font-semibold text-gray-900">Docs Clone</h1>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        <button
          type="button"
          onClick={onNewDocument}
          className="flex items-center gap-2 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 px-3 py-2.5 text-sm font-medium text-blue-700 hover:border-blue-400 hover:bg-blue-100"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
            <Plus size={14} strokeWidth={3} />
          </span>
          New Document
        </button>

        <UploadButton onUploadComplete={onUploadComplete} />

        <Link
          href="/dashboard"
          className={`mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
            filter === "mine"
              ? "bg-white text-blue-700 shadow-sm"
              : "text-gray-700 hover:bg-white"
          }`}
        >
          <FileText size={18} />
          My Documents
        </Link>

        <Link
          href="/dashboard/shared"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
            filter === "shared"
              ? "bg-white text-blue-700 shadow-sm"
              : "text-gray-700 hover:bg-white"
          }`}
        >
          <Users size={18} />
          Shared With Me
        </Link>
      </nav>

      <div className="border-t border-gray-200 p-3">
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-white"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
