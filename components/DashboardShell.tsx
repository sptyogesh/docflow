"use client";

import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";

type DashboardShellProps = {
  children: React.ReactNode;
};

export default function DashboardShell({ children }: DashboardShellProps) {
  const router = useRouter();

  async function handleNewDocument() {
    const res = await fetch("/api/documents", { method: "POST" });
    if (!res.ok) return;
    const document = await res.json();
    router.push(`/documents/${document.id}`);
  }

  function handleUploadComplete(documentId: string) {
    router.push(`/documents/${documentId}`);
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        onNewDocument={handleNewDocument}
        onUploadComplete={handleUploadComplete}
      />
      <main className="flex flex-1 flex-col bg-white p-6">{children}</main>
    </div>
  );
}
