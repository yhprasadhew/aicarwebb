export default function Home() {
  return (
    <div className="pt-16 min-h-screen bg-black flex flex-col">   {/* This pt-16 is important */}
      
      {/* Hero Section */}
      <section className="relative flex-1 dotted-background flex items-center justify-center overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold gradient-title leading-[1.05] tracking-tighter">
            Find your Dream car with<br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              AUTODRIVE-AI
            </span>
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
            Advanced AI-powered car search and test drive from thousands of vehicles
          </p>

          <div className="mt-12">
            {/* <Button size="lg" className="text-lg px-10 py-6 rounded-full">
              Join the Waitlist
            </Button> */}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
      </section>

    </div>
  );
}