'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Import local images from the codebase for the cards
import MclarenImg from '@/public/images/Mclaren-720S.png';
import FordGtImg from '@/public/images/Ford_Gt.png';
import MgImg from '@/public/images/MG4.png';

const Categories = () => {
  const router = useRouter();
  const [loadingCategory, setLoadingCategory] = useState(null);

  const curatedCategories = [
    {
      id: 'supercars',
      category: 'Supercars',
      badge: 'High Performance',
      description: 'Compare high-speed exotic sports cars built for pure performance and track power.',
      specs: ['High Horsepower', 'Track Speed', 'V8 & V10 Power'],
      query: 'supercars',
      fallbackImg: MclarenImg,
      ctaLabel: 'Compare Supercars',
    },
    {
      id: 'popular',
      category: 'Popular Cars',
      badge: 'Popular Choice',
      description: 'Compare iconic high-demand cars celebrated for standout styling, power, and road presence.',
      specs: ['High Demand', 'Twin-Turbo Power', 'Iconic Styling'],
      query: 'popular',
      fallbackImg: FordGtImg,
      ctaLabel: 'Compare Popular Cars',
    },
    {
      id: 'hatchback',
      category: 'Hatchbacks',
      badge: 'City Friendly',
      description: 'Compare compact city cars that are easy to park, versatile, and fun to drive.',
      specs: ['Compact Size', 'Easy Parking', 'Electric & Gas'],
      query: 'hatchback',
      fallbackImg: MgImg,
      ctaLabel: 'Compare Hatchbacks',
    },
  ];

  const handleLaunchComparison = async (query) => {
    setLoadingCategory(query);
    try {
      // Fetch cars strictly within this category from the database
      const res = await axios.get(`/api/getCarByCategory/${query}`);
      const cars = res.data;

      if (cars && cars.length >= 2) {
        // Compare the top two cars in this exact category
        router.push(`/comparecar/${cars[0]._id}/${cars[1]._id}`);
      } else {
        // Fallback: If less than 2 cars exist, route to the category list
        router.push(`/category/${query}`);
      }
    } catch (error) {
      console.error('Failed to load comparison cars:', error);
      router.push(`/category/${query}`);
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-black via-[#0d0d0f] to-[#0a0a0a] text-white py-20 px-4 md:px-8 lg:px-16 border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-[#E11D48] bg-[#E11D48]/10 px-3 py-1 rounded-full border border-[#E11D48]/30">
            Compare by Category
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black italic tracking-tight uppercase text-white mt-4">
            Curated <span className="text-[#E11D48]">Comparisons</span>
          </h2>
          <p className="text-neutral-400 font-medium text-sm sm:text-base leading-relaxed mt-3">
            Choose a vehicle category below to compare two cars of the same type side-by-side.
          </p>
        </div>

        {/* 3D Category Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full justify-center items-stretch">
          {curatedCategories.map((item) => (
            <div
              key={item.id}
              onClick={() => handleLaunchComparison(item.query)}
              className="group relative flex flex-col items-center justify-between p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#161618] via-[#0d0d0f] to-black border border-white/10 hover:border-[#E11D48]/50 shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden w-full cursor-pointer select-none"
            >
              {/* Ambient Crimson Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#E11D48]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#E11D48]/20 transition-all duration-500" />

              {/* Top Status & Badge */}
              <div className="w-full flex justify-between items-center z-10 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E11D48] bg-[#E11D48]/10 px-3 py-1 rounded-full border border-[#E11D48]/30">
                  {item.badge}
                </span>
                <span className="text-[11px] text-neutral-400 font-medium">
                  2-Car Compare
                </span>
              </div>

              {/* 3D Car Image Stage & Floor Shadow */}
              <div className="w-full h-44 sm:h-48 flex flex-col items-center justify-center relative py-2 z-10">
                <Image
                  src={item.fallbackImg}
                  height={220}
                  width={360}
                  alt={item.category}
                  priority={false}
                  className="w-full max-h-36 object-contain relative z-10 drop-shadow-2xl group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
                />
                <div className="w-[80%] h-3.5 bg-black/90 blur-md rounded-[100%] mt-[-4px] pointer-events-none" />
              </div>

              {/* Category Title & Clean Description */}
              <div className="w-full text-center z-10 mt-3">
                <h3 className="text-2xl font-black italic tracking-tight text-white uppercase group-hover:text-[#E11D48] transition-colors">
                  {item.category}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm mt-2 line-clamp-2 max-w-xs mx-auto leading-relaxed">
                  {item.description}
                </p>

                {/* Simple Characteristic Pills */}
                <div className="flex flex-wrap justify-center items-center gap-2 mt-3.5">
                  {item.specs.map((spec, idx) => (
                    <span
                      key={idx}
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        idx === 1
                          ? 'text-[#E11D48] bg-[#E11D48]/10 border-[#E11D48]/30'
                          : 'text-neutral-300 bg-white/5 border-white/10'
                      }`}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Simple, Clean Button */}
              <button
                disabled={loadingCategory === item.query}
                className="mt-6 w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-[#E11D48] border border-white/10 hover:border-[#E11D48] text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-white transition-all text-center flex items-center justify-center gap-2 z-10 shadow-lg group-hover:shadow-[#E11D48]/25"
              >
                {loadingCategory === item.query ? (
                  <span className="flex items-center gap-2 text-[#E11D48] group-hover:text-white animate-pulse">
                    <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Loading Cars...
                  </span>
                ) : (
                  <>
                    <span>{item.ctaLabel}</span>
                    <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;