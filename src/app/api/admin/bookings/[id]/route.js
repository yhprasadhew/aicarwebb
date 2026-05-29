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
  const { status } = await request.json();

  if (!["PENDING", "CONFIRMED", "CANCELLED"].includes(status)) {
    return jsonError("Invalid status", 400);
  }

  const booking = await db.testDriveBooking.update({
    where: { id },
    data: { status },
  });

  return jsonOk({ booking });
}
