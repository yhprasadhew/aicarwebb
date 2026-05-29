"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Gauge, Fuel, Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { Card } from "./ui/card";

const CarCard = ({ car }) => {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [saved, setSaved] = useState(car?.wishlisted || false);
  const [loading, setLoading] = useState(false);

  if (!car) return null;

  const toggleWishlist = async (e) => {
    e.stopPropagation();

    if (!isSignedIn) {
      toast.error("Sign in to save cars to your wishlist");
      return;
    }

    setLoading(true);
    try {
      if (saved) {
        const res = await fetch(`/api/wishlist?carId=${car.id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error();
        setSaved(false);
      } else {
        const res = await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ carId: car.id }),
        });
        if (!res.ok) throw new Error();
        setSaved(true);
      }
    } catch {
      toast.error("Could not update wishlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="group overflow-hidden bg-[#0b1423] border border-white/10 hover:border-cyan-400/40 transition-all duration-300 rounded-2xl">
      <div className="relative h-44 overflow-hidden">
        <button
          type="button"
          onClick={toggleWishlist}
          disabled={loading}
          className="absolute top-3 right-3 z-20 bg-black/50 backdrop-blur-md p-2 rounded-full hover:bg-black/70 transition disabled:opacity-50"
        >
          <Heart
            className={`w-4 h-4 transition ${
              saved ? "fill-red-500 text-red-500" : "text-white"
            }`}
          />
        </button>

        <Image
          src={car.image}
          alt={`${car.make} ${car.model}`}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          quality={80}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-white font-semibold text-lg leading-tight">
              {car.make} {car.model}
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              {car.year} • {car.color}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white text-lg font-semibold tracking-tight">
              ${car.price?.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-xs text-gray-300">
            <Gauge className="w-3.5 h-3.5" />
            {car.mileage?.toLocaleString()} km
          </div>
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-xs text-gray-300">
            <Fuel className="w-3.5 h-3.5" />
            {car.fuelType}
          </div>
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-xs text-gray-300">
            <Settings2 className="w-3.5 h-3.5" />
            {car.transmission}
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push(`/cars/${car.id}`)}
          className="w-full mt-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition"
        >
          View Details
        </button>
      </div>
    </Card>
  );
};

export default CarCard;
