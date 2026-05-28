import React from "react";
import HomeSearch from "../components/home-search";
import { ChevronRight } from "lucide-react";
import CarCard from "../components/car-card";

export default function Home() {

  // TEMP DATA (replace later with API/Supabase)
  const featuredCars = [
    {
      id: 1,
      make: "Tesla",
      model: "Model S",
      year: 2024,
      price: 30000,
      images: ["/tesla.jpg"],
    },
    {
      id: 2,
      make: "BMW",
      model: "i8",
      year: 2023,
      price: 45000,
      images: ["/bmwi8.jpg"],
    },
    {
      id: 3,
      make: "Audi",
      model: "R8",
      year: 2022,
      price: 120000,
      images: ["/r8.jpg"],
    },
  ];

  return (
    <main className="min-h-screen bg-[#071120]">

      {/* HERO SECTION */}
      <section className="relative min-h-[75vh] pt-20 flex items-center justify-center overflow-hidden bg-[#071120]">

        <div className="absolute inset-0">
          <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[140px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            Find your Dream Car <br />
            with <span className="text-[#00f5c0]">AUTODRIVE-AI</span>
          </h1>

          <p className="mt-6 text-gray-300 max-w-3xl mx-auto">
            Advanced AI-powered car search and test drive from thousands of premium vehicles.
          </p>

          <div className="mt-10">
            <HomeSearch />
          </div>

        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 pointer-events-none" />
      </section>

      {/* FEATURED CARS */}
      <section className="py-10 px-6 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            Featured Cars
          </h2>

          <button className="flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition">
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>

        {/* CAR GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

      </section>

    </main>
  );
}