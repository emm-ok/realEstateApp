// HomePage.jsx
import React from "react";
import Footer from "./Footer";

const featuredProperties = [
  {
    id: 1,
    title: "Luxury Villa in Beverly Hills",
    price: "$4,500,000",
    location: "Beverly Hills, CA",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Modern Apartment in New York",
    price: "$1,200,000",
    location: "New York, NY",
    image:
      "https://images.unsplash.com/photo-1560185127-6e5e1dc0a7b1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Beachfront House in Miami",
    price: "$3,200,000",
    location: "Miami, FL",
    image:
      "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80",
  },
];

const popularCities = [
  { id: 1, name: "Los Angeles", image: "https://images.unsplash.com/photo-1506277889590-0b6c3dfc2a76?auto=format&fit=crop&w=400&q=60" },
  { id: 2, name: "New York", image: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=400&q=60" },
  { id: 3, name: "Miami", image: "https://images.unsplash.com/photo-1506619216599-9d16f6b74b33?auto=format&fit=crop&w=400&q=60" },
];

const testimonials = [
  { id: 1, name: "Jane Doe", feedback: "Amazing platform! Found my dream home in weeks." },
  { id: 2, name: "John Smith", feedback: "Smooth experience, very user-friendly and professional." },
];

const HomePage = () => {
  return (
    <main className="font-inter">
      {/* Hero Section */}
      <section
        className="relative bg-gray-100 flex flex-col items-center justify-center text-center py-24 px-4 md:py-32"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Find Your Dream Property
          </h1>
          <p className="text-gray-200 mb-6">
            Browse luxury homes, apartments, and condos across top cities.
          </p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <input
              type="text"
              placeholder="Search by location..."
              className="px-4 py-2 rounded-md w-full md:w-64 focus:outline-none"
            />
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md font-semibold transition">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 px-4 md:px-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <div
              key={property.id}
              className="flex flex-col justify-between bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-1">{property.location}</p>
                <p className="text-emerald-500 font-bold">{property.price}</p>
                <button className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-md transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-16 px-4 md:px-16 bg-gray-50">
        <h2 className="text-3xl font-bold mb-8 text-center">Popular Cities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {popularCities.map((city) => (
            <div
              key={city.id}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
            >
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <h3 className="text-white text-xl font-semibold">{city.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-16 px-4 md:px-16 text-center">
        <div className="bg-emerald-500 text-white rounded-lg py-16 px-8">
          <h2 className="text-3xl font-bold mb-4">
            List Your Property With Us
          </h2>
          <p className="mb-6">
            Reach thousands of potential buyers and renters instantly.
          </p>
          <button className="bg-white text-emerald-500 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 md:px-16 bg-gray-50">
        <h2 className="text-3xl font-bold mb-12 text-center">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition"
            >
              <p className="text-gray-700 mb-4">"{t.feedback}"</p>
              <p className="font-semibold">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default HomePage;
