import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { jsonError, jsonOk } from "@/lib/api";

export async function GET(request) {
  try {
    await requireAdmin();
  } catch {
    return jsonError("Admin access required", 403);
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "OPEN";

  const inquiries = await db.listingInquiry.findMany({
    where: status === "ALL" ? {} : { status },
    include: {
      car: { select: { make: true, model: true, year: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return jsonOk({ inquiries });
}
