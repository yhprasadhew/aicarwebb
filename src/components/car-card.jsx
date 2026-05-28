import React from "react";
import { Card } from "./ui/card";

const CarCard = ({ car }) => {
  return (
    <Card className="overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-400/40 transition group">

      {/* IMAGE */}
      <div className="relative h-48 w-full overflow-hidden">
        {car?.images?.length > 0 ? (
          <img
            src={car.images[0]}
            alt={`${car.make || ""} ${car.model || ""}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image Available
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg">
          {car.make} {car.model}
        </h3>

        <p className="text-gray-400 text-sm mt-1">
          {car.year || "Year N/A"}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-cyan-400 font-medium">
            {car.price ? `$${car.price}` : "Price N/A"}
          </span>

          <button className="text-sm text-white/70 hover:text-white transition">
            View Details
          </button>
        </div>
      </div>

    </Card>
  );
};

export default CarCard;