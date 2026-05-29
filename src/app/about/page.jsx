export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#071120] text-white pt-28 px-6 pb-16">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1 className="text-4xl font-bold mb-6">About AUTODRIVE-AI</h1>
        <p className="text-gray-300 leading-relaxed mb-6">
          AUTODRIVE-AI is an AI-powered car marketplace. Upload a photo or describe
          what you want — we match you to real inventory. Save favorites, book test
          drives, and message our team from any listing.
        </p>

        <h2 className="text-2xl font-semibold text-cyan-400 mt-10 mb-4">
          Setup (first time)
        </h2>
        <ol className="list-decimal list-inside text-gray-300 space-y-2 text-sm">
          <li>Copy <code className="text-cyan-300">.env.example</code> to <code className="text-cyan-300">.env</code></li>
          <li>Add Clerk keys from dashboard.clerk.com</li>
          <li>Add Supabase Postgres <code className="text-cyan-300">DATABASE_URL</code> and <code className="text-cyan-300">DIRECT_URL</code></li>
          <li>Add <code className="text-cyan-300">OPENAI_API_KEY</code> for AI photo/text search</li>
          <li>Run <code className="text-cyan-300">pnpm install</code> then <code className="text-cyan-300">pnpm run db:setup</code></li>
          <li>Run <code className="text-cyan-300">pnpm dev</code></li>
        </ol>

        <h2 className="text-2xl font-semibold text-cyan-400 mt-10 mb-4">
          Admin access
        </h2>
        <p className="text-gray-300 text-sm">
          In Clerk → Users → your user → Public metadata, set:{" "}
          <code className="text-cyan-300">{`{ "role": "admin" }`}</code>
        </p>
      </div>
    </main>
  );
}
