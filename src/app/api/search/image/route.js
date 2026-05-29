import { analyzeCarImage, findCarsFromAiResult } from "@/lib/ai";
import { serializeCar } from "@/lib/cars";
import { jsonError, jsonOk } from "@/lib/api";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || typeof file === "string") {
      return jsonError("Image file is required", 400);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const mimeType = file.type || "image/jpeg";

    const aiResult = await analyzeCarImage(base64, mimeType);
    let cars = await findCarsFromAiResult(aiResult);

    if (cars.length === 0) {
      const { db } = await import("@/lib/prisma");
      cars = await db.car.findMany({
        where: { status: "AVAILABLE" },
        take: 6,
        orderBy: { featured: "desc" },
      });
    }

    return jsonOk({
      cars: cars.map((c) => serializeCar(c)),
      ai: {
        usedOpenAI: !aiResult.fallback,
        confidence: aiResult.confidence,
        reasoning: aiResult.reasoning,
        attrs: aiResult.attrs,
      },
    });
  } catch (error) {
    console.error("Image search error:", error);
    return jsonError("Failed to analyze image", 500);
  }
}
