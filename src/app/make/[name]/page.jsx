import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import CarCard from "@/components/car-card";
import { getAvailableCars } from "@/lib/getCars";

export default async function MakePage({ params }) {
  const { name } = await params;
  const cars = await getAvailableCars({ make: decodeURIComponent(name) });

  return (
    <main className="min-h-screen bg-[#071120] text-white pt-24 px-6 pb-16">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Home
        </Link>
        <h1 className="text-3xl font-semibold capitalize mb-8">{name} vehicles</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </main>
  );
}
