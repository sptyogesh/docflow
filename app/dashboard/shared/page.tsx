"use client";

import { useEffect, useState } from "react";
import DocumentList, { DocumentItem } from "@/components/DocumentList";

export default function SharedDashboardPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/documents?filter=shared")
      .then((res) => res.json())
      .then(setDocuments)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">
        Shared With Me
      </h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <DocumentList
          documents={documents}
          emptyMessage="No shared documents yet."
        />
      )}
    </div>
  );
}
