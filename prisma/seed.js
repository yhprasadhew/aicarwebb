/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const inventory = [
  {
    make: "Tesla",
    model: "Model S",
    year: 2024,
    price: 40000,
    mileage: 15000,
    transmission: "Automatic",
    fuelType: "Electric",
    color: "White",
    bodyType: "Sedan",
    seats: 5,
    featured: true,
    description:
      "Premium electric sedan with long range, autopilot-ready hardware, and minimalist luxury interior.",
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&auto=format&fit=crop",
    ],
  },
  {
    make: "BMW",
    model: "i8",
    year: 2023,
    price: 35000,
    mileage: 22000,
    transmission: "Automatic",
    fuelType: "Hybrid",
    color: "Blue",
    bodyType: "Coupe",
    seats: 4,
    featured: true,
    description:
      "Futuristic hybrid sports coupe with butterfly doors and striking design.",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&auto=format&fit=crop",
    ],
  },
  {
    make: "Audi",
    model: "R8",
    year: 2022,
    price: 75000,
    mileage: 12000,
    transmission: "Automatic",
    fuelType: "Petrol",
    color: "Black",
    bodyType: "Coupe",
    seats: 2,
    featured: true,
    description:
      "Mid-engine supercar with V10 performance and quattro all-wheel drive.",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&auto=format&fit=crop",
    ],
  },
  {
    make: "Nissan",
    model: "GT-R",
    year: 2020,
    price: 260000,
    mileage: 1000,
    transmission: "Automatic",
    fuelType: "Petrol",
    color: "Grey",
    bodyType: "Coupe",
    seats: 4,
    featured: true,
    description:
      "Legendary Godzilla — twin-turbo AWD performance icon with track-ready handling.",
    images: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1200&auto=format&fit=crop",
    ],
  },
  {
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2021,
    price: 30000,
    mileage: 25000,
    transmission: "Automatic",
    fuelType: "Petrol",
    color: "Blue",
    bodyType: "Sedan",
    seats: 5,
    featured: true,
    description:
      "Executive compact luxury sedan with refined comfort and modern tech.",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&auto=format&fit=crop",
    ],
  },
  {
    make: "Porsche",
    model: "Taycan",
    year: 2025,
    price: 120000,
    mileage: 500,
    transmission: "Automatic",
    fuelType: "Electric",
    color: "White",
    bodyType: "Sedan",
    seats: 4,
    featured: true,
    description:
      "High-performance electric sports sedan from Porsche with rapid charging.",
    images: [
      "https://images.unsplash.com/photo-1614162692292-7a56aaaae7cf?w=1200&auto=format&fit=crop",
    ],
  },
];

const workingHours = [
  { dayOfWeek: "MONDAY", openTime: "09:00", closeTime: "18:00" },
  { dayOfWeek: "TUESDAY", openTime: "09:00", closeTime: "18:00" },
  { dayOfWeek: "WEDNESDAY", openTime: "09:00", closeTime: "18:00" },
  { dayOfWeek: "THURSDAY", openTime: "09:00", closeTime: "18:00" },
  { dayOfWeek: "FRIDAY", openTime: "09:00", closeTime: "18:00" },
  { dayOfWeek: "SATURDAY", openTime: "10:00", closeTime: "16:00" },
  { dayOfWeek: "SUNDAY", openTime: "00:00", closeTime: "00:00", isOpen: false },
];

async function main() {
  const dealership = await prisma.dealership.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      name: "AUTODRIVE Motors",
      email: "contact@autodrive.ai",
      address: "123 Innovation Drive, Auto City",
    },
  });

  for (const hour of workingHours) {
    await prisma.workingHour.upsert({
      where: {
        dealershipId_dayOfWeek: {
          dealershipId: dealership.id,
          dayOfWeek: hour.dayOfWeek,
        },
      },
      update: hour,
      create: { ...hour, dealershipId: dealership.id },
    });
  }

  const existing = await prisma.car.count();
  if (existing === 0) {
    for (const car of inventory) {
      await prisma.car.create({
        data: {
          ...car,
          dealershipId: dealership.id,
          status: "AVAILABLE",
        },
      });
    }
    console.log(`Seeded ${inventory.length} cars.`);
  } else {
    console.log(`Skipped car seed (${existing} cars already in DB).`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
