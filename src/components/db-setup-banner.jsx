import Link from "next/link";
import { isDemoMode } from "@/lib/getCars";

export default function DbSetupBanner() {
  if (!isDemoMode()) return null;

  return (
    <div className="mx-6 mt-24 mb-0 max-w-7xl lg:mx-auto rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
      <strong className="text-amber-300">Demo mode:</strong> Set{" "}
      <code className="text-amber-200">DATABASE_URL</code> in{" "}
      <code className="text-amber-200">.env</code> and run{" "}
      <code className="text-amber-200">pnpm run db:setup</code> for live inventory,
      wishlist, bookings, and messages. See{" "}
      <Link href="/about" className="underline text-cyan-300">
        setup guide
      </Link>
      .
    </div>
  );
}
