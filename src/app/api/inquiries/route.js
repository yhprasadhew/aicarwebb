import { getDbUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { jsonError, jsonOk } from "@/lib/api";

export async function GET() {
  const user = await getDbUser();
  if (!user) return jsonError("Sign in to view messages", 401);

  const inquiries = await db.listingInquiry.findMany({
    where: {
      OR: [{ userId: user.id }, { customerEmail: user.email }],
    },
    include: {
      car: { select: { make: true, model: true, year: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return jsonOk({ inquiries });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { carId, customerName, customerEmail, message } = body;

    if (!carId || !customerName || !customerEmail || !message?.trim()) {
      return jsonError("Name, email, and message are required", 400);
    }

    const car = await db.car.findUnique({ where: { id: carId } });
    if (!car) return jsonError("Car not found", 404);

    const dbUser = await getDbUser();

    const inquiry = await db.listingInquiry.create({
      data: {
        carId,
        userId: dbUser?.id ?? null,
        customerName,
        customerEmail,
        message: message.trim(),
        status: "OPEN",
      },
    });

    return jsonOk({ inquiry }, 201);
  } catch (error) {
    console.error("Inquiry error:", error);
    return jsonError("Could not send message", 500);
  }
}
