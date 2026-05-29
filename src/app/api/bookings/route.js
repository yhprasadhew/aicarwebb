import { getDbUser, requireDbUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { jsonError, jsonOk } from "@/lib/api";

export async function GET() {
  const user = await getDbUser();
  if (!user) return jsonError("Sign in to view reservations", 401);

  const bookings = await db.testDriveBooking.findMany({
    where: {
      OR: [{ userId: user.id }, { customerEmail: user.email }],
    },
    include: {
      car: { select: { make: true, model: true, year: true, images: true } },
    },
    orderBy: { bookingDate: "desc" },
  });

  return jsonOk({ bookings });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      carId,
      customerName,
      customerEmail,
      customerPhone,
      bookingDate,
      message,
    } = body;

    if (!carId || !customerName || !customerEmail || !customerPhone || !bookingDate) {
      return jsonError("Missing required booking fields", 400);
    }

    const car = await db.car.findUnique({ where: { id: carId } });
    if (!car || car.status !== "AVAILABLE") {
      return jsonError("This vehicle is not available for booking", 400);
    }

    const dbUser = await getDbUser();

    const booking = await db.testDriveBooking.create({
      data: {
        carId,
        userId: dbUser?.id ?? null,
        customerName,
        customerEmail,
        customerPhone,
        bookingDate: new Date(bookingDate),
        message: message || null,
        status: "PENDING",
      },
    });

    return jsonOk({ booking }, 201);
  } catch (error) {
    console.error("Booking error:", error);
    return jsonError("Could not create reservation", 500);
  }
}
