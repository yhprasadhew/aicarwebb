import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import CarCard from "../../components/car-card";
import { featuredCars } from "../../lib/data";

export default function CarsPage() {
  return (
    <main className="min-h-screen bg-[#071120] text-white">
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition mb-4"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-semibold">All Cars</h1>
            <p className="text-gray-400 mt-2">
              Browse the full inventory. The homepage only highlights the first 4 featured vehicles for a cleaner experience.
            </p>
          </div>
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
            {featuredCars.length} vehicles available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </main>
  );
}
