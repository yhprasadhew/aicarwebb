"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Loader2, MessageSquare } from "lucide-react";

const statusStyle = {
  OPEN: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  REPLIED: "text-green-400 border-green-400/30 bg-green-400/10",
  CLOSED: "text-gray-400 border-gray-500/30 bg-gray-500/10",
};

export default function MessagesPage() {
  const [inquiries, setInquiries] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/inquiries")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setInquiries(data.inquiries || []);
      })
      .catch((e) => setError(e.message))
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

        <h1 className="text-3xl font-semibold mb-2 flex items-center gap-2">
          <MessageSquare className="w-8 h-8 text-cyan-400" />
          My Messages
        </h1>
        <p className="text-gray-400 mb-8">
          Messages you sent about listings and replies from our team.
        </p>

        {loading && (
          <div className="flex gap-2 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading...
          </div>
        )}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && inquiries.length === 0 && (
          <p className="text-gray-400">
            No messages yet. Open a car listing and use &quot;Message about this
            car&quot; to contact us.
          </p>
        )}

        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="rounded-2xl border border-white/10 bg-[#0b1423] p-5"
            >
              <div className="flex justify-between items-start gap-3">
                <div>
                  <Link
                    href={`/cars/${inq.carId}`}
                    className="font-semibold hover:text-cyan-400"
                  >
                    {inq.car.year} {inq.car.make} {inq.car.model}
                  </Link>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(inq.createdAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full border shrink-0 ${statusStyle[inq.status]}`}
                >
                  {inq.status}
                </span>
              </div>
              <p className="text-gray-300 mt-3 text-sm">{inq.message}</p>
              {inq.adminReply && (
                <div className="mt-4 rounded-xl bg-cyan-400/5 border border-cyan-400/20 p-4">
                  <p className="text-xs text-cyan-400 font-medium mb-1">
                    Team reply
                  </p>
                  <p className="text-gray-200 text-sm">{inq.adminReply}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
