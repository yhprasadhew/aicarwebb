"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export default function AdminPage() {
  const [tab, setTab] = React.useState("bookings");
  const [bookings, setBookings] = React.useState([]);
  const [inquiries, setInquiries] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [replyDraft, setReplyDraft] = React.useState({});

  const load = React.useCallback(async () => {
    setLoading(true);
    const [bRes, iRes] = await Promise.all([
      fetch("/api/admin/bookings?status=PENDING"),
      fetch("/api/admin/inquiries?status=OPEN"),
    ]);
    const bData = await bRes.json();
    const iData = await iRes.json();
    setBookings(bData.bookings || []);
    setInquiries(iData.inquiries || []);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const updateBooking = async (id, status) => {
    await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };

  const replyInquiry = async (id) => {
    const adminReply = replyDraft[id];
    if (!adminReply?.trim()) return;

    await fetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminReply, status: "REPLIED" }),
    });
    setReplyDraft((d) => ({ ...d, [id]: "" }));
    load();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#071120] pt-24 flex justify-center text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Loading admin...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#071120] text-white pt-24 px-6 pb-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-400 mb-8">
          Manage pending reservations and customer messages.
        </p>

        <div className="flex gap-2 mb-8">
          {["bookings", "inquiries"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                tab === t
                  ? "bg-cyan-500 text-black"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              {t} ({t === "bookings" ? bookings.length : inquiries.length})
            </button>
          ))}
        </div>

        {tab === "bookings" && (
          <div className="space-y-4">
            {bookings.length === 0 && (
              <p className="text-gray-400">No pending reservations.</p>
            )}
            {bookings.map((b) => (
              <div
                key={b.id}
                className="rounded-2xl border border-white/10 bg-[#0b1423] p-5"
              >
                <h3 className="font-semibold">
                  {b.car.year} {b.car.make} {b.car.model}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {b.customerName} · {b.customerEmail} · {b.customerPhone}
                </p>
                <p className="text-sm text-gray-300 mt-2">
                  {new Date(b.bookingDate).toLocaleString()}
                </p>
                {b.message && (
                  <p className="text-sm text-gray-400 mt-2">{b.message}</p>
                )}
                <div className="flex gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => updateBooking(b.id, "CONFIRMED")}
                    className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 text-sm"
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    onClick={() => updateBooking(b.id, "CANCELLED")}
                    className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "inquiries" && (
          <div className="space-y-4">
            {inquiries.length === 0 && (
              <p className="text-gray-400">No open messages.</p>
            )}
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                className="rounded-2xl border border-white/10 bg-[#0b1423] p-5"
              >
                <h3 className="font-semibold">
                  {inq.car.year} {inq.car.make} {inq.car.model}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {inq.customerName} · {inq.customerEmail}
                </p>
                <p className="text-gray-300 mt-3">{inq.message}</p>
                {inq.adminReply && (
                  <p className="text-cyan-400 text-sm mt-2">
                    Reply: {inq.adminReply}
                  </p>
                )}
                <textarea
                  rows={2}
                  placeholder="Type admin reply..."
                  value={replyDraft[inq.id] || ""}
                  onChange={(e) =>
                    setReplyDraft((d) => ({ ...d, [inq.id]: e.target.value }))
                  }
                  className="w-full mt-3 rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-sm text-white"
                />
                <button
                  type="button"
                  onClick={() => replyInquiry(inq.id)}
                  className="mt-2 px-4 py-2 rounded-lg bg-cyan-500 text-black text-sm font-medium"
                >
                  Send reply
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
