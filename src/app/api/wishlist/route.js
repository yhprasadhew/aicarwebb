import { getDbUser, requireDbUser } from "@/lib/auth";
import { serializeCar } from "@/lib/cars";
import { db } from "@/lib/prisma";
import { jsonError, jsonOk } from "@/lib/api";

export async function GET() {
  const user = await getDbUser();
  if (!user) return jsonError("Sign in to view saved cars", 401);

  const saved = await db.userSavedCar.findMany({
    where: { userId: user.id },
    include: { car: true },
    orderBy: { createdAt: "desc" },
  });

  return jsonOk({
    cars: saved.map((s) => serializeCar(s.car, { wishlisted: true })),
  });
}

export async function POST(request) {
  try {
    const user = await requireDbUser();
    const { carId } = await request.json();

    if (!carId) return jsonError("carId is required", 400);

    await db.userSavedCar.upsert({
      where: { userId_carId: { userId: user.id, carId } },
      update: {},
      create: { userId: user.id, carId },
    });

    return jsonOk({ saved: true });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return jsonError("Sign in to save cars", 401);
    }
    return jsonError("Could not save car", 500);
  }
}

export async function DELETE(request) {
  try {
    const user = await requireDbUser();
    const { searchParams } = new URL(request.url);
    const carId = searchParams.get("carId");

    if (!carId) return jsonError("carId is required", 400);

    await db.userSavedCar.deleteMany({
      where: { userId: user.id, carId },
    });

    return jsonOk({ saved: false });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return jsonError("Sign in required", 401);
    }
    return jsonError("Could not remove car", 500);
  }
}
