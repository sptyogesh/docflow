import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { canAccessDocument } from "@/lib/documents";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const hasAccess = await canAccessDocument(id, session.user.id);
  if (!hasAccess) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const document = await prisma.document.findUnique({ where: { id } });
  return NextResponse.json(document);
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const hasAccess = await canAccessDocument(id, session.user.id);
  if (!hasAccess) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json();
  const data: { title?: string; content?: string } = {};

  if (typeof body.title === "string") data.title = body.title;
  if (typeof body.content === "string") data.content = body.content;

  const document = await prisma.document.update({
    where: { id },
    data,
  });

  return NextResponse.json(document);
}
