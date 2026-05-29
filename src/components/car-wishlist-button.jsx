"use client";

import React from "react";
import { Heart } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

export default function CarWishlistButton({ carId, initialSaved = false }) {
  const { isSignedIn } = useAuth();
  const [saved, setSaved] = React.useState(initialSaved);
  const [loading, setLoading] = React.useState(false);

  const toggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      toast.error("Sign in to save cars to your wishlist");
      return;
    }

    setLoading(true);
    try {
      if (saved) {
        const res = await fetch(`/api/wishlist?carId=${carId}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Could not remove");
        setSaved(false);
        toast.success("Removed from wishlist");
      } else {
        const res = await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ carId }),
        });
        if (!res.ok) throw new Error("Could not save");
        setSaved(true);
        toast.success("Added to wishlist");
      }
    } catch {
      toast.error("Wishlist update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      className="bg-black/50 backdrop-blur-md p-3 rounded-full hover:bg-black/70 transition disabled:opacity-50"
    >
      <Heart
        className={`w-5 h-5 ${
          saved ? "fill-red-500 text-red-500" : "text-white"
        }`}
      />
    </button>
  );
}
