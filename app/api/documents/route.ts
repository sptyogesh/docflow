import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter") ?? "mine";

  if (filter === "shared") {
    const shares = await prisma.share.findMany({
      where: { sharedWithUserId: session.user.id },
      include: {
        document: {
          include: { owner: { select: { email: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const documents = shares.map((share) => ({
      ...share.document,
      sharedBy: share.document.owner.email,
    }));

    return NextResponse.json(documents);
  }

  const documents = await prisma.document.findMany({
    where: { ownerId: session.user.id },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(documents);
}

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const document = await prisma.document.create({
    data: {
      title: "Untitled Document",
      content: "",
      ownerId: session.user.id,
    },
  });

  return NextResponse.json(document, { status: 201 });
}
