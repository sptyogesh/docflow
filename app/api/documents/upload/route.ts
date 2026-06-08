import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { plainTextToHtml } from "@/lib/documents";
import { prisma } from "@/lib/prisma";

const ALLOWED_EXTENSIONS = [".txt", ".md"];

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "File required" }, { status: 400 });
  }

  const fileName = file.name.toLowerCase();
  const isAllowed = ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext));

  if (!isAllowed) {
    return NextResponse.json(
      { error: "Only .txt and .md files are supported" },
      { status: 400 }
    );
  }

  const text = await file.text();
  const title = file.name.replace(/\.(txt|md)$/i, "") || "Uploaded Document";
  const content = fileName.endsWith(".md")
    ? plainTextToHtml(text)
    : plainTextToHtml(text);

  const document = await prisma.document.create({
    data: {
      title,
      content,
      ownerId: session.user.id,
    },
  });

  return NextResponse.json(document, { status: 201 });
}
