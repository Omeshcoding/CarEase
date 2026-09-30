import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import bmwLogo from '../public/images/bmw-logo.png';
import LamborghiniLogo from '../public/images/Lamborghini-Logo.png';
import mclarenLogo from '../public/images/mclaren-logo.png';
import maseratiLogo from '../public/images/maserati-logo.png';
import ToyotaLogo from '../public/images/Toyota.png';
import TataLogo from '../public/images/Tatalogo.png';
import MarutiLogo from '../public/images/marutilogo.png';

const brands = [
  { name: 'BMW', logo: bmwLogo, query: 'BMW' },
  { name: 'Lamborghini', logo: LamborghiniLogo, query: 'Lamborghini' },
  { name: 'McLaren', logo: mclarenLogo, query: 'McLaren' },
  { name: 'Maserati', logo: maseratiLogo, query: 'Maserati' },
  { name: 'Toyota', logo: ToyotaLogo, query: 'Toyota' },
  { name: 'Tata', logo: TataLogo, query: 'Tata' },
  { name: 'Maruti', logo: MarutiLogo, query: 'Maruti' },
];

const PopularBrands = () => {
  return (
    <section className="w-full bg-gradient-to-b from-black via-[#0d0d0f] to-[#121214] py-16 sm:py-24 border-t border-white/5">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#E11D48] bg-[#E11D48]/10 px-3 py-1 rounded-full border border-[#E11D48]/30 w-fit">
              Marque Heritage
            </span>
            <h2 className="text-3xl sm:text-5xl font-black italic tracking-tight uppercase text-white mt-3">
              <span className="text-[#E11D48]">Popular</span> Brands
            </h2>
            <p className="text-neutral-400 font-medium max-w-xl text-sm sm:text-base leading-relaxed mt-2">
              Explore precision engineering and motorsport pedigree from premier global manufacturers. Filter inventory with one click.
            </p>
          </div>
          <Link
            href="/carlist"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E11D48] hover:text-white transition-colors"
          >
            <span>View All Manufacturers</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-5">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href={`/carlist?search=${encodeURIComponent(brand.query)}`}
              className="group relative flex flex-col items-center justify-center p-5 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-[#E11D48]/50 shadow-lg hover:shadow-[0_10px_25px_rgba(225,29,72,0.2)] transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#E11D48]/0 group-hover:bg-[#E11D48]/10 blur-xl transition-all duration-500 pointer-events-none" />
              <div className="w-full h-20 flex items-center justify-center p-2 relative z-10 bg-white/[0.04] group-hover:bg-white/[0.08] rounded-xl border border-white/5 transition-all">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={80}
                  className="max-h-12 w-auto max-w-[85%] object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 group-hover:text-white transition-colors mt-3 text-center z-10">
                {brand.name}
              </span>
              <span className="text-[10px] font-semibold text-[#E11D48] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1 z-10">
                Explore Fleet →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBrands;
