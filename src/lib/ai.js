import { db } from "./prisma";
import { buildCarWhereFromAi, buildTextSearchWhere } from "./cars";

async function chatCompletion(messages, maxTokens = 500) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
      max_tokens: maxTokens,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI error: ${err}`);
  }

  const data = await res.json();
  return data.choices[0]?.message?.content ?? "{}";
}

async function getInventorySummary() {
  const cars = await db.car.findMany({
    where: { status: "AVAILABLE" },
    select: {
      id: true,
      make: true,
      model: true,
      year: true,
      color: true,
      bodyType: true,
      fuelType: true,
      price: true,
    },
  });

  return cars.map(
    (c) =>
      `${c.id}: ${c.year} ${c.make} ${c.model} (${c.color}, ${c.bodyType}, ${c.fuelType}, $${Number(c.price)})`
  );
}

function parseJsonFromModel(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON in model response");
  return JSON.parse(match[0]);
}

export async function analyzeCarImage(base64, mimeType) {
  if (!process.env.OPENAI_API_KEY) {
    return { fallback: true, attrs: {}, matchedIds: [], confidence: 0, reasoning: "" };
  }

  const inventoryLines = await getInventorySummary();

  const content = await chatCompletion([
    {
      role: "system",
      content: `You are an expert automotive visual matcher for a dealership inventory.
Given a user photo, identify the vehicle and match it to our inventory list.
Return ONLY valid JSON:
{
  "make": string or null,
  "model": string or null,
  "bodyType": string or null,
  "color": string or null,
  "fuelType": string or null,
  "yearMin": number or null,
  "yearMax": number or null,
  "matchedInventoryIds": string[],
  "confidence": number between 0 and 1,
  "reasoning": string
}
Pick matchedInventoryIds from these inventory lines (use the UUID before the colon). Prefer exact make/model matches. If unsure, return closest matches (max 4).`,
    },
    {
      role: "user",
      content: [
        {
          type: "text",
          text: `Our inventory:\n${inventoryLines.join("\n")}`,
        },
        {
          type: "image_url",
          image_url: { url: `data:${mimeType};base64,${base64}` },
        },
      ],
    },
  ]);

  if (!content) {
    return { fallback: true, attrs: {}, matchedIds: [], confidence: 0, reasoning: "" };
  }

  const parsed = parseJsonFromModel(content);

  return {
    fallback: false,
    attrs: {
      make: parsed.make,
      model: parsed.model,
      bodyType: parsed.bodyType,
      color: parsed.color,
      fuelType: parsed.fuelType,
      yearMin: parsed.yearMin,
      yearMax: parsed.yearMax,
    },
    matchedIds: Array.isArray(parsed.matchedInventoryIds)
      ? parsed.matchedInventoryIds
      : [],
    confidence: parsed.confidence ?? 0,
    reasoning: parsed.reasoning ?? "",
  };
}

export async function smartTextSearch(query) {
  if (!process.env.OPENAI_API_KEY) {
    return { fallback: true, attrs: null, matchedIds: [] };
  }

  const inventoryLines = await getInventorySummary();

  const content = await chatCompletion(
    [
      {
        role: "system",
        content: `Parse the user's car search into filters and inventory matches.
Return ONLY JSON:
{
  "make": string or null,
  "model": string or null,
  "bodyType": string or null,
  "color": string or null,
  "fuelType": string or null,
  "yearMin": number or null,
  "yearMax": number or null,
  "maxPrice": number or null,
  "matchedInventoryIds": string[],
  "keywords": string
}`,
      },
      {
        role: "user",
        content: `Query: "${query}"\n\nInventory:\n${inventoryLines.join("\n")}`,
      },
    ],
    400
  );

  if (!content) {
    return { fallback: true, attrs: null, matchedIds: [] };
  }

  const parsed = parseJsonFromModel(content);

  return {
    fallback: false,
    attrs: {
      make: parsed.make,
      model: parsed.model,
      bodyType: parsed.bodyType,
      color: parsed.color,
      fuelType: parsed.fuelType,
      yearMin: parsed.yearMin,
      yearMax: parsed.yearMax,
    },
    matchedIds: Array.isArray(parsed.matchedInventoryIds)
      ? parsed.matchedInventoryIds
      : [],
    maxPrice: parsed.maxPrice,
    keywords: parsed.keywords,
  };
}

export async function findCarsFromAiResult(aiResult, textQuery) {
  const ids = aiResult.matchedIds?.filter(Boolean) ?? [];

  if (ids.length > 0) {
    const byIds = await db.car.findMany({
      where: { id: { in: ids }, status: "AVAILABLE" },
    });
    if (byIds.length > 0) return byIds;
  }

  if (aiResult.attrs && Object.values(aiResult.attrs).some(Boolean)) {
    const byAttrs = await db.car.findMany({
      where: buildCarWhereFromAi(aiResult.attrs),
      take: 12,
      orderBy: { featured: "desc" },
    });
    if (byAttrs.length > 0) return byAttrs;
  }

  if (textQuery) {
    return db.car.findMany({
      where: buildTextSearchWhere(textQuery),
      take: 12,
      orderBy: { featured: "desc" },
    });
  }

  return [];
}
