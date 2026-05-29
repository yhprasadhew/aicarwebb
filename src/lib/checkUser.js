import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export async function checkUser() {
  const user = await currentUser();
  if (!user) return null;

  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();

  try {
    return await db.user.upsert({
      where: { clerkUserId: user.id },
      update: {
        email: user.emailAddresses[0]?.emailAddress ?? undefined,
        name: name || undefined,
        imageUrl: user.imageUrl ?? undefined,
      },
      create: {
        clerkUserId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: name || null,
        imageUrl: user.imageUrl ?? null,
      },
    });
  } catch (error) {
    console.error("Error syncing user to database:", error);
    return null;
  }
}
