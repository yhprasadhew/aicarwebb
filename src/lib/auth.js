import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export async function getDbUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const name = [clerkUser.firstName, clerkUser.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  return db.user.upsert({
    where: { clerkUserId: clerkUser.id },
    update: {
      email: clerkUser.emailAddresses[0]?.emailAddress ?? undefined,
      name: name || undefined,
      imageUrl: clerkUser.imageUrl ?? undefined,
    },
    create: {
      clerkUserId: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      name: name || null,
      imageUrl: clerkUser.imageUrl ?? null,
    },
  });
}

export async function requireDbUser() {
  const user = await getDbUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function isAdminUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) return false;

  const metaRole =
    clerkUser.publicMetadata?.role === "admin" ||
    clerkUser.unsafeMetadata?.role === "admin";

  if (metaRole) return true;

  const dbUser = await db.user.findUnique({
    where: { clerkUserId: clerkUser.id },
  });

  return dbUser?.role === "ADMIN";
}

export async function requireAdmin() {
  const admin = await isAdminUser();
  if (!admin) {
    throw new Error("Forbidden");
  }
  const { userId } = await auth();
  return userId;
}
