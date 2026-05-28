// src/app/page.jsx

import React from "react";
import HomeSearch from "../components/home-search";
import { ChevronRight, Sparkles, ShieldCheck, BadgeDollarSign, CarFront } from "lucide-react";
import CarCard from "../components/car-card";
import { featuredCars, carMakes } from "../lib/data";
import Link from "next/link";

export default function Home() {
  const featuredPreview = featuredCars.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#071120]">

      {/* HERO SECTION */}
      <section className="relative min-h-[75vh] pt-20 flex items-center justify-center overflow-hidden bg-[#071120]">

        <div className="absolute inset-0">
          <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[140px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Find your Dream Car <br />
            with{" "}
            <span className="text-[#00f5c0]">AUTODRIVE-AI</span>
          </h1>

          <p className="mt-6 text-gray-300 max-w-3xl mx-auto text-base md:text-lg">
            Advanced AI-powered car search and test drive from thousands of premium vehicles.
          </p>

          <div className="mt-10">
            <HomeSearch />
          </div>

        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 pointer-events-none" />
      </section>

      {/* FEATURED CARS */}
      <section className="py-12 px-6 max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Featured Cars
          </h2>

          <Link
            href="/cars"
            className="flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition"
          >
            View All Cars
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {featuredPreview.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}

        </div>
      </section>

      {/* BROWSE BY MAKE */}
      <section className="pb-16 px-6 max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Browse by Make
          </h2>

          <button className="flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition">
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          {carMakes.map((make) => (
            <Link key={make.id} href={`/make/${make.name}`}>
              <div className="group bg-[#0b1423] border border-white/10 hover:border-cyan-400/40 hover:bg-[#111c2d] transition-all duration-300 p-6 rounded-2xl cursor-pointer">

                <div className="flex justify-center mb-4">
                  <img
                    src={make.image}
                    alt={make.name}
                    className="w-16 h-16 object-contain group-hover:scale-105 transition-transform"
                  />
                </div>

                <h3 className="text-white text-center font-medium capitalize">
                  {make.name}
                </h3>

              </div>
            </Link>
          ))}

        </div>
      </section>

      {/* WHY CHOOSE OUR PLATFORM */}
      <section className="relative py-24 px-6">

        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-14">

            <p className="text-cyan-400 text-sm tracking-[0.25em] uppercase">
              Why Choose AUTODRIVE-AI
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
              A Smarter Way to Find Cars
            </h2>

            <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
              We combine AI technology with premium listings to give you a faster,
              safer, and smarter car buying experience.
            </p>

          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Card 1 */}
            <div className="bg-[#0b1423] border border-white/10 hover:border-cyan-400/40 p-6 rounded-2xl">
              <Sparkles className="text-cyan-400 mb-4" />
              <h3 className="text-white font-semibold mb-2">AI Smart Search</h3>
              <p className="text-gray-400 text-sm">
                Find your perfect car instantly with intelligent recommendations.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0b1423] border border-white/10 hover:border-cyan-400/40 p-6 rounded-2xl">
              <ShieldCheck className="text-cyan-400 mb-4" />
              <h3 className="text-white font-semibold mb-2">Verified Listings</h3>
              <p className="text-gray-400 text-sm">
                Every car is checked for accuracy and authenticity.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0b1423] border border-white/10 hover:border-cyan-400/40 p-6 rounded-2xl">
              <BadgeDollarSign className="text-cyan-400 mb-4" />
              <h3 className="text-white font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-400 text-sm">
                Compare prices and get the best deals instantly.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#0b1423] border border-white/10 hover:border-cyan-400/40 p-6 rounded-2xl">
              <CarFront className="text-cyan-400 mb-4" />
              <h3 className="text-white font-semibold mb-2">Premium Experience</h3>
              <p className="text-gray-400 text-sm">
                Smooth, fast, and modern car browsing experience.
              </p>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}