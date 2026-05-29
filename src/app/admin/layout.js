import { redirect } from "next/navigation";
import { isAdminUser } from "@/lib/auth";

export default async function AdminLayout({ children }) {
  const admin = await isAdminUser();
  if (!admin) {
    redirect("/");
  }
  return children;
}
