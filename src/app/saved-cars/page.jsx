"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import CarCard from "@/components/car-card";

export default function SavedCarsPage() {
  const [cars, setCars] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/wishlist")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setCars(data.cars || []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

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

        <h1 className="text-3xl font-semibold mb-2">Saved Cars</h1>
        <p className="text-gray-400 mb-8">Your wishlist across AUTODRIVE-AI</p>

        {loading && (
          <div className="flex gap-2 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading...
          </div>
        )}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && cars.length === 0 && (
          <p className="text-gray-400">
            No saved cars yet.{" "}
            <Link href="/cars" className="text-cyan-400">
              Browse inventory
            </Link>
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </main>
  );
}
