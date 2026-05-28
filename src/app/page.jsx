// src/app/page.jsx

import React from "react";
import HomeSearch from "../components/home-search";
import { ChevronRight } from "lucide-react";
import CarCard from "../components/car-card";
import { featuredCars, carMakes } from "../lib/data";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#071120]">

      {/* HERO SECTION */}
      <section className="relative min-h-[75vh] pt-20 flex items-center justify-center overflow-hidden bg-[#071120]">

        {/* Glow */}
        <div className="absolute inset-0">
          <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[140px] rounded-full" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Find your Dream Car
            <br />
            with{" "}
            <span className="text-[#00f5c0]">
              AUTODRIVE-AI
            </span>
          </h1>

          <p className="mt-6 text-gray-300 max-w-3xl mx-auto text-base md:text-lg">
            Advanced AI-powered car search and
            test drive from thousands of premium vehicles.
          </p>

          {/* Search */}
          <div className="mt-10">
            <HomeSearch />
          </div>

        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 pointer-events-none" />

      </section>

      {/* FEATURED CARS */}
      <section className="py-12 px-6 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">

          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Featured Cars
          </h2>

          <button className="flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition">
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>

        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {featuredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
            />
          ))}

        </div>

      </section>

      {/* BROWSE BY MAKE */}
      <section className="pb-16 px-6 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">

          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Browse by Make
          </h2>

          <button className="flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition">
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>

        </div>

        {/* Makes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          {carMakes.map((make) => (
            <Link
              key={make.id}
              href={`/make/${make.name}`}
            >
              <div className="group bg-[#0b1423] border border-white/10 hover:border-cyan-400/40 hover:bg-[#111c2d] transition-all duration-300 p-6 rounded-2xl cursor-pointer">

                {/* Logo */}
                <div className="flex justify-center mb-4">
                  <img
                    src={make.image}
                    alt={make.name}
                    className="w-16 h-16 object-contain group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Name */}
                <h3 className="text-white text-center font-medium capitalize">
                  {make.name}
                </h3>

              </div>
            </Link>
          ))}

        </div>

      </section>

    </main>
  );
}