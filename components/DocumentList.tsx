"use client";

import Link from "next/link";
import { FileText } from "lucide-react";

export type DocumentItem = {
  id: string;
  title: string;
  updatedAt: string;
  sharedBy?: string;
};

type DocumentListProps = {
  documents: DocumentItem[];
  emptyMessage: string;
};

export default function DocumentList({
  documents,
  emptyMessage,
}: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center text-gray-500">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => (
        <Link
          key={doc.id}
          href={`/documents/${doc.id}`}
          className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
        >
          <FileText className="mt-0.5 shrink-0 text-blue-600" size={20} />
          <div className="min-w-0">
            <h3 className="truncate font-medium text-gray-900">{doc.title}</h3>
            <p className="mt-1 text-xs text-gray-500">
              Updated {new Date(doc.updatedAt).toLocaleDateString()}
            </p>
            {doc.sharedBy && (
              <p className="mt-1 text-xs text-gray-400">
                Shared by {doc.sharedBy}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
