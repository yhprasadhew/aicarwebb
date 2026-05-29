import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getCarById } from "@/lib/getCars";
import BookingForm from "@/components/booking-form";
import InquiryForm from "@/components/inquiry-form";
import CarWishlistButton from "@/components/car-wishlist-button";

export default async function CarDetailPage({ params }) {
  const { id } = await params;
  const car = await getCarById(id);

  if (!car) notFound();

  const title = `${car.year} ${car.make} ${car.model}`;

  return (
    <main className="min-h-screen bg-[#071120] text-white pt-24 px-6 pb-16">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/cars"
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to inventory
        </Link>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="relative h-80 lg:h-[480px] rounded-2xl overflow-hidden border border-white/10">
            <Image
              src={car.image}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute top-4 right-4">
              <CarWishlistButton carId={car.id} initialSaved={car.wishlisted} />
            </div>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
            <p className="text-3xl text-cyan-400 font-semibold mt-2">
              ${car.price?.toLocaleString()}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {[car.color, car.fuelType, car.transmission, car.bodyType].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300"
                  >
                    {tag}
                  </span>
                )
              )}
              <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                {car.mileage?.toLocaleString()} km
              </span>
            </div>

            <p className="text-gray-300 mt-6 leading-relaxed">{car.description}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="rounded-2xl border border-white/10 bg-[#0b1423] p-6">
            <BookingForm carId={car.id} carName={title} />
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0b1423] p-6">
            <InquiryForm carId={car.id} carName={title} />
          </div>
        </div>
      </div>
    </main>
  );
}
