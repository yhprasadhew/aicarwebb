import { db } from "./prisma";
import { serializeCar } from "./cars";
import { featuredCars } from "./data";
import { getDbUser } from "./auth";

const DEMO_MODE = !process.env.DATABASE_URL;

function demoCars() {
  return featuredCars.map((c) => ({
    ...c,
    description: `${c.year} ${c.make} ${c.model} — demo listing. Connect DATABASE_URL for live inventory.`,
    wishlisted: false,
  }));
}

export async function getAvailableCars({ featuredOnly = false, make } = {}) {
  if (DEMO_MODE) {
    let list = demoCars();
    if (featuredOnly) list = list.slice(0, 4);
    if (make) {
      const m = make.toLowerCase();
      list = list.filter((c) => c.make.toLowerCase().includes(m));
    }
    return list;
  }

  try {
    const user = await getDbUser();
    let savedIds = new Set();

    if (user) {
      const saved = await db.userSavedCar.findMany({
        where: { userId: user.id },
        select: { carId: true },
      });
      savedIds = new Set(saved.map((s) => s.carId));
    }

    const cars = await db.car.findMany({
      where: {
        status: "AVAILABLE",
        ...(featuredOnly ? { featured: true } : {}),
        ...(make ? { make: { contains: make, mode: "insensitive" } } : {}),
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });

    if (cars.length === 0) return [];

    return cars.map((c) =>
      serializeCar(c, { wishlisted: savedIds.has(c.id) })
    );
  } catch (error) {
    console.warn("Database unavailable, using demo cars:", error?.message || error);
    let list = demoCars();
    if (featuredOnly) list = list.slice(0, 4);
    if (make) {
      const m = make.toLowerCase();
      list = list.filter((c) => c.make.toLowerCase().includes(m));
    }
    return list;
  }
}

export async function getCarById(id) {
  if (DEMO_MODE) {
    return demoCars().find((c) => c.id === id) ?? null;
  }

  try {
    const user = await getDbUser();
    const car = await db.car.findUnique({ where: { id } });
    if (!car) return demoCars().find((c) => c.id === id) ?? null;

    let wishlisted = false;
    if (user) {
      const saved = await db.userSavedCar.findUnique({
        where: { userId_carId: { userId: user.id, carId: id } },
      });
      wishlisted = Boolean(saved);
    }

    return serializeCar(car, { wishlisted });
  } catch {
    return demoCars().find((c) => c.id === id) ?? null;
  }
}

export function isDemoMode() {
  return DEMO_MODE;
}
