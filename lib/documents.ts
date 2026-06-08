import { prisma } from "./prisma";

export async function canAccessDocument(
  documentId: string,
  userId: string
): Promise<boolean> {
  const document = await prisma.document.findUnique({
    where: { id: documentId },
    include: { shares: true },
  });

  if (!document) return false;
  if (document.ownerId === userId) return true;

  return document.shares.some((share) => share.sharedWithUserId === userId);
}

export function plainTextToHtml(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped
    .split(/\n\n+/)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
    .join("");
}
