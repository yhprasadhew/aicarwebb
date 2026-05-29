export function serializeCar(car, { wishlisted = false } = {}) {
  if (!car) return null;

  return {
    id: car.id,
    make: car.make,
    model: car.model,
    year: car.year,
    price: Number(car.price),
    mileage: car.mileage,
    transmission: car.transmission,
    fuelType: car.fuelType,
    color: car.color,
    bodyType: car.bodyType,
    seats: car.seats,
    description: car.description,
    status: car.status,
    featured: car.featured,
    images: car.images,
    image:
      car.images?.[0] ||
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&auto=format&fit=crop",
    wishlisted,
  };
}

export function buildCarWhereFromAi(attrs) {
  const conditions = [{ status: "AVAILABLE" }];

  if (attrs.make) {
    conditions.push({ make: { contains: attrs.make, mode: "insensitive" } });
  }
  if (attrs.model) {
    conditions.push({ model: { contains: attrs.model, mode: "insensitive" } });
  }
  if (attrs.bodyType) {
    conditions.push({
      bodyType: { contains: attrs.bodyType, mode: "insensitive" },
    });
  }
  if (attrs.color) {
    conditions.push({ color: { contains: attrs.color, mode: "insensitive" } });
  }
  if (attrs.fuelType) {
    conditions.push({
      fuelType: { contains: attrs.fuelType, mode: "insensitive" },
    });
  }
  if (attrs.yearMin || attrs.yearMax) {
    conditions.push({
      year: {
        ...(attrs.yearMin ? { gte: attrs.yearMin } : {}),
        ...(attrs.yearMax ? { lte: attrs.yearMax } : {}),
      },
    });
  }

  return { AND: conditions };
}

export function buildTextSearchWhere(query) {
  const q = query.trim();
  if (!q) return { status: "AVAILABLE" };

  return {
    status: "AVAILABLE",
    OR: [
      { make: { contains: q, mode: "insensitive" } },
      { model: { contains: q, mode: "insensitive" } },
      { color: { contains: q, mode: "insensitive" } },
      { bodyType: { contains: q, mode: "insensitive" } },
      { fuelType: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ],
  };
}
