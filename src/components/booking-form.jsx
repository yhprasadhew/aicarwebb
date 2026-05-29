"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export default function BookingForm({ carId, carName }) {
  const { user, isSignedIn } = useUser();
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    bookingDate: "",
    message: "",
  });

  React.useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        customerName:
          [user.firstName, user.lastName].filter(Boolean).join(" ") || f.customerName,
        customerEmail: user.primaryEmailAddress?.emailAddress || f.customerEmail,
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carId, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");

      toast.success("Test drive reservation submitted!");
      setForm((f) => ({ ...f, bookingDate: "", message: "" }));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-white">
        Reserve test drive — {carName}
      </h3>

      {!isSignedIn && (
        <p className="text-sm text-gray-400">
          Sign in to track reservations, or book as a guest below.
        </p>
      )}

      <input
        required
        placeholder="Full name"
        value={form.customerName}
        onChange={(e) => setForm({ ...form, customerName: e.target.value })}
        className="w-full rounded-xl bg-[#0b1423] border border-white/10 px-4 py-2.5 text-white"
      />
      <input
        required
        type="email"
        placeholder="Email"
        value={form.customerEmail}
        onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
        className="w-full rounded-xl bg-[#0b1423] border border-white/10 px-4 py-2.5 text-white"
      />
      <input
        required
        placeholder="Phone"
        value={form.customerPhone}
        onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
        className="w-full rounded-xl bg-[#0b1423] border border-white/10 px-4 py-2.5 text-white"
      />
      <input
        required
        type="datetime-local"
        value={form.bookingDate}
        onChange={(e) => setForm({ ...form, bookingDate: e.target.value })}
        className="w-full rounded-xl bg-[#0b1423] border border-white/10 px-4 py-2.5 text-white"
      />
      <textarea
        placeholder="Message (optional)"
        rows={3}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full rounded-xl bg-[#0b1423] border border-white/10 px-4 py-2.5 text-white resize-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Request reservation"}
      </button>
    </form>
  );
}
