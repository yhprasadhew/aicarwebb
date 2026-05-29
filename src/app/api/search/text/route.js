import { findCarsFromAiResult, smartTextSearch } from "@/lib/ai";
import { serializeCar, buildTextSearchWhere } from "@/lib/cars";
import { db } from "@/lib/prisma";
import { jsonError, jsonOk } from "@/lib/api";

export async function POST(request) {
  try {
    const { query } = await request.json();
    if (!query?.trim()) {
      return jsonError("Search query is required", 400);
    }

    const aiResult = await smartTextSearch(query.trim());
    let cars = await findCarsFromAiResult(aiResult, query.trim());

    if (cars.length === 0) {
      cars = await db.car.findMany({
        where: buildTextSearchWhere(query.trim()),
        take: 12,
        orderBy: { featured: "desc" },
      });
    }

    if (aiResult.maxPrice) {
      cars = cars.filter((c) => Number(c.price) <= aiResult.maxPrice);
    }

    return jsonOk({
      cars: cars.map((c) => serializeCar(c)),
      ai: { usedOpenAI: !aiResult.fallback, attrs: aiResult.attrs },
    });
  } catch (error) {
    console.error("Text search error:", error);
    return jsonError("Search failed", 500);
  }
}
