// data.js - Featured Cars with professional image URLs and complete specifications
export const featuredCars = [
  {
    id: 1,
    make: "Tesla",
    model: "Model S",
    year: 2024,
    price: 40000,
    mileage: 15000,
    transmission: "Automatic",
    fuelType: "Electric",
    color: "white",
    wishlisted: false,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399",
  },
  {
    id: 2,
    make: "BMW",
    model: "i8",
    year: 2023,
    price: 35000,
    mileage: 22000,
    transmission: "Automatic",
    fuelType: "Hybrid",
    color: "white",
    wishlisted: false,
    image: "/i77.jpg",
  },
  {
    id: 3,
    make: "Audi",
    model: "R8",
    year: 2022,
    price: 75000,
    mileage: 12000,
    transmission: "Automatic",
    fuelType: "Petrol",
    color: "White",
    wishlisted: false,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop",
  },
{
  id :4,
  make : "Toyota",
  model : "vitz",
  year : 2020,
  price : 6000,
  mileage : 30000,
  transmission : "Automatic",
  fuelType : "Petrol",
  color : "White",
  wishlisted : false,
  image : "/vitz.jpg",
},
];

export const carMakes = [
    { id:1, name : "tesla" ,image : "/mod/teslam.jpg" },
    { id:2, name : "bmw", image : "/mod/bmwm.jpg" },
    { id:3, name : "audi", image : "/mod/audim.jpg" },
    { id:4, name : "toyota", image : "/mod/toyotam.jpg" },
];

export const bodyTypes = [
    { id:1, name : "sedan"},
    { id:2, name : "coupe"},
    { id:3, name : "convertible"},
];