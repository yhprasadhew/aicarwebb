// Fallback inventory when database is unavailable (dev/demo only)
export const featuredCars = [
  {
    id: "demo-1",
    make: "Tesla",
    model: "Model S",
    year: 2024,
    price: 40000,
    mileage: 15000,
    transmission: "Automatic",
    fuelType: "Electric",
    color: "White",
    bodyType: "Sedan",
    wishlisted: false,
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&auto=format&fit=crop",
  },
  {
    id: "demo-2",
    make: "BMW",
    model: "i8",
    year: 2023,
    price: 35000,
    mileage: 22000,
    transmission: "Automatic",
    fuelType: "Hybrid",
    color: "Blue",
    bodyType: "Coupe",
    wishlisted: false,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&auto=format&fit=crop",
  },
  {
    id: "demo-3",
    make: "Audi",
    model: "R8",
    year: 2022,
    price: 75000,
    mileage: 12000,
    transmission: "Automatic",
    fuelType: "Petrol",
    color: "Black",
    bodyType: "Coupe",
    wishlisted: false,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&auto=format&fit=crop",
  },
  {
    id: "demo-4",
    make: "Nissan",
    model: "GT-R",
    year: 2020,
    price: 260000,
    mileage: 1000,
    transmission: "Automatic",
    fuelType: "Petrol",
    color: "Grey",
    bodyType: "Coupe",
    wishlisted: false,
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1200&auto=format&fit=crop",
  },
  {
    id: "demo-5",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2021,
    price: 30000,
    mileage: 25000,
    transmission: "Automatic",
    fuelType: "Petrol",
    color: "Blue",
    bodyType: "Sedan",
    wishlisted: false,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&auto=format&fit=crop",
  },
  {
    id: "demo-6",
    make: "Porsche",
    model: "Taycan",
    year: 2025,
    price: 120000,
    mileage: 500,
    transmission: "Automatic",
    fuelType: "Electric",
    color: "White",
    bodyType: "Sedan",
    wishlisted: false,
    image:
      "https://images.unsplash.com/photo-1614162692292-7a56aaaae7cf?w=1200&auto=format&fit=crop",
  },
];

export const carMakes = [
  { id: 1, name: "tesla" },
  { id: 2, name: "bmw" },
  { id: 3, name: "audi" },
  { id: 4, name: "nissan" },
  { id: 5, name: "mercedes" },
  { id: 6, name: "porsche" },
];

export const bodyTypes = [
  { id: 1, name: "sedan" },
  { id: 2, name: "coupe" },
  { id: 3, name: "convertible" },
];
