import React from 'react';
import Link from 'next/link';
import FeaturedCarCard from './FeaturedCarCard';

const featuredCars = [
  {
    model: 'Aston Martin DBS',
    imgUrl: '/images/Aston_Martin_DBS.png',
    badge: 'Super GT',
    specs: ['Twin-Turbo V12', '715 HP', '3.4s 0-60'],
    search: 'Aston Martin',
  },
  {
    model: 'MG 4',
    imgUrl: '/images/MG4.png',
    badge: 'Dual Motor EV',
    specs: ['AWD Electric', '435 HP', '3.8s 0-60'],
    search: 'MG',
  },
  {
    model: 'Maserati MC20',
    imgUrl: '/images/Maserati MC20.png',
    badge: 'Carbon Monocoque',
    specs: ['Nettuno 3.0L V6', '621 HP', '2.9s 0-60'],
    search: 'Maserati',
  },
];

const FeaturedComparison = () => {
  return (
    <section className="w-full bg-gradient-to-b from-[#121214] via-[#0d0d0f] to-black py-20 sm:py-28 border-t border-white/5">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-[#E11D48] bg-[#E11D48]/10 px-3 py-1 rounded-full border border-[#E11D48]/30">
            Pinnacle Performance
          </span>
          <h2 className="text-3xl sm:text-5xl font-black italic tracking-tight uppercase text-white mt-4">
            <span className="text-[#E11D48]">Featured</span> Showdowns
          </h2>
          <p className="text-neutral-400 font-medium text-sm sm:text-base leading-relaxed mt-3">
            Analyze horsepower, aerodynamic diagnostics, and track telemetry head-to-head. Select any flagship model to inspect performance metrics.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 justify-center items-stretch">
          {featuredCars.map((car) => (
            <FeaturedCarCard
              key={car.model}
              model={car.model}
              imgUrl={car.imgUrl}
              badge={car.badge}
              specs={car.specs}
              search={car.search}
            />
          ))}
        </div>

        {/* Primary CTA */}
        <div className="flex justify-center mt-14">
          <Link
            href="/comparison"
            className="group inline-flex items-center gap-3 bg-[#E11D48] hover:bg-[#f43f5e] text-white font-black uppercase italic tracking-wider text-sm sm:text-base px-8 py-4 rounded-xl shadow-[0_0_25px_rgba(225,29,72,0.4)] transition-all hover:scale-105"
          >
            <span>Launch Comparison Vault</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedComparison;
