"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, Loader2, Sparkles } from "lucide-react";
import CarCard from "@/components/car-card";

function SearchResults() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "text";
  const query = searchParams.get("q") || "";

  const [cars, setCars] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [aiInfo, setAiInfo] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const stored = sessionStorage.getItem("aiSearchResults");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCars(parsed.cars || []);
        setAiInfo(parsed.ai || null);
        setLoading(false);
        return;
      } catch {
        /* continue to fetch */
      }
    }

    if (mode === "text" && query) {
      fetch("/api/search/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
          setCars(data.cars || []);
          setAiInfo(data.ai);
        })
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [mode, query]);

  return (
    <main className="min-h-screen bg-[#071120] text-white pt-24 px-6 pb-16">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Home
        </Link>

        <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
          <div>
            <h1 className="text-3xl font-semibold flex items-center gap-2">
              <Sparkles className="text-cyan-400 w-7 h-7" />
              AI Search Results
            </h1>
            {query && (
              <p className="text-gray-400 mt-2">
                Showing matches for &quot;{query}&quot;
              </p>
            )}
            {mode === "image" && (
              <p className="text-gray-400 mt-2">Matches from your photo</p>
            )}
          </div>
        </div>

        {aiInfo?.reasoning && (
          <div className="mb-6 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-sm text-gray-300">
            <span className="text-cyan-400 font-medium">AI insight: </span>
            {aiInfo.reasoning}
            {aiInfo.confidence != null && (
              <span className="text-gray-500 ml-2">
                ({Math.round(aiInfo.confidence * 100)}% confidence)
              </span>
            )}
          </div>
        )}

        {!aiInfo?.usedOpenAI && !loading && (
          <p className="mb-4 text-amber-400/90 text-sm">
            Add OPENAI_API_KEY in .env for full AI vision matching. Using keyword
            search fallback.
          </p>
        )}

        {loading && (
          <div className="flex items-center gap-2 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing inventory...
          </div>
        )}

        {error && (
          <p className="text-red-400">{error}</p>
        )}

        {!loading && !error && cars.length === 0 && (
          <p className="text-gray-400">
            No matches found. Try a different search or browse{" "}
            <Link href="/cars" className="text-cyan-400">
              all cars
            </Link>
            .
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#071120] pt-24 flex justify-center text-gray-400">
          Loading search...
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
