import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { jsonError, jsonOk } from "@/lib/api";

export async function PATCH(request, { params }) {
  try {
    await requireAdmin();
  } catch {
    return jsonError("Admin access required", 403);
  }

  const { id } = await params;
  const { adminReply, status } = await request.json();

  const data = {};
  if (adminReply !== undefined) data.adminReply = adminReply;
  if (status) data.status = status;
  if (adminReply?.trim()) data.status = status || "REPLIED";

  const inquiry = await db.listingInquiry.update({
    where: { id },
    data,
  });

  return jsonOk({ inquiry });
}
