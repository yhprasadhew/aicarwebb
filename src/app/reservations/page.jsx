"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";

const statusColors = {
  PENDING: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  CONFIRMED: "text-green-400 border-green-400/30 bg-green-400/10",
  CANCELLED: "text-red-400 border-red-400/30 bg-red-400/10",
};

export default function ReservationsPage() {
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/bookings")
      .then((r) => r.json())
      .then((data) => setBookings(data.bookings || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#071120] text-white pt-24 px-6 pb-16">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Home
        </Link>

        <h1 className="text-3xl font-semibold mb-8">My Reservations</h1>

        {loading && (
          <div className="flex gap-2 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading...
          </div>
        )}

        {!loading && bookings.length === 0 && (
          <p className="text-gray-400">
            No reservations yet. Pick a car and book a test drive from its detail
            page.
          </p>
        )}

        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-white/10 bg-[#0b1423] p-5"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    {b.car.year} {b.car.make} {b.car.model}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {new Date(b.bookingDate).toLocaleString()}
                  </p>
                  {b.message && (
                    <p className="text-gray-300 text-sm mt-2">{b.message}</p>
                  )}
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full border ${statusColors[b.status]}`}
                >
                  {b.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
