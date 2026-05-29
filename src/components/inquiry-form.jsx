"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export default function InquiryForm({ carId, carName }) {
  const { user } = useUser();
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    customerName: "",
    customerEmail: "",
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
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carId, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");

      toast.success("Message sent! Our team will reply soon.");
      setForm((f) => ({ ...f, message: "" }));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-white">
        Message about {carName}
      </h3>
      <p className="text-sm text-gray-400">
        Ask about price, availability, or financing. An admin will respond to your email.
      </p>

      <input
        required
        placeholder="Your name"
        value={form.customerName}
        onChange={(e) => setForm({ ...form, customerName: e.target.value })}
        className="w-full rounded-xl bg-[#0b1423] border border-white/10 px-4 py-2.5 text-white"
      />
      <input
        required
        type="email"
        placeholder="Your email"
        value={form.customerEmail}
        onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
        className="w-full rounded-xl bg-[#0b1423] border border-white/10 px-4 py-2.5 text-white"
      />
      <textarea
        required
        placeholder="Your message..."
        rows={4}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full rounded-xl bg-[#0b1423] border border-white/10 px-4 py-2.5 text-white resize-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 font-semibold disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
