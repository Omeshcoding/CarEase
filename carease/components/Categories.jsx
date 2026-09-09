'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Import local images from the codebase for the cards
// (Fallback to these if we don't have dynamic images)
import MclarenImg from '@/public/images/Mclaren-720S.png';
import MiniImg from '@/public/images/Mini_Cooper_Countryman.png';
import MgImg from '@/public/images/MG4.png';

const Categories = () => {
  const router = useRouter();
  const [loadingCategory, setLoadingCategory] = useState(null);

  const curatedShowdowns = [
    {
      id: 'supercars',
      name: 'Supercar Showdown',
      description: 'Ultra-premium performance vehicles',
      query: 'supercars',
      fallbackImg: MclarenImg,
      color: 'from-purple-900/40 to-black'
    },
    {
      id: 'popular',
      name: 'Popular Daily Drivers',
      description: 'The most requested everyday vehicles',
      query: 'popular',
      fallbackImg: MiniImg, 
      color: 'from-blue-900/40 to-black'
    },
    {
      id: 'hatchback',
      name: 'Hatchback Battles',
      description: 'Compact, efficient, and versatile',
      query: 'hatchback',
      fallbackImg: MgImg,
      color: 'from-emerald-900/40 to-black'
    },
  ];

  const handleLaunchShowdown = async (query) => {
    setLoadingCategory(query);
    try {
      // Fetch cars for this category
      const res = await axios.get(`/api/getCarByCategory/${query}`);
      const cars = res.data;
      
      if (cars && cars.length >= 2) {
        // Grab the first two cars in the category to create an instant matchup
        router.push(`/comparecar/${cars[0]._id}/${cars[1]._id}`);
      } else {
        // Fallback: If not enough cars exist for a comparison, just route to the category list
        router.push(`/category/${query}`);
      }
    } catch (error) {
      console.error("Failed to launch showdown:", error);
      router.push(`/category/${query}`);
    }
    // We intentionally don't clear loading state if successful because the page will route away
  };

  return (
    <section className="w-full bg-[#111111] text-white py-16 px-4 md:px-8 lg:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black italic tracking-widest uppercase mb-4">
            Curated <span className="text-[#E11D48]">Showdowns</span>
          </h1>
          <p className="text-white/50 text-sm tracking-widest uppercase">
            Not sure what to compare? Launch an instant comparison from our top categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {curatedShowdowns.map((category) => (
            <div 
              key={category.id}
              onClick={() => handleLaunchShowdown(category.query)}
              className={`group cursor-pointer rounded-3xl overflow-hidden relative border border-white/10 hover:border-[#E11D48]/50 transition-all duration-300 min-h-[250px] flex flex-col justify-end p-6 bg-gradient-to-t ${category.color}`}
            >
              {/* Background Hover Glow */}
              <div className="absolute inset-0 bg-[#E11D48] opacity-5 md:opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>

              {/* Placeholder Image (Always visible on mobile, faint on desktop until hover) */}
              <div className="absolute top-4 right-4 w-[180px] opacity-80 md:opacity-30 group-hover:opacity-100 scale-105 md:scale-100 group-hover:scale-110 transition-all duration-500 origin-right">
                 <Image src={category.fallbackImg} alt="Category Background" width={300} height={150} className="object-contain" />
              </div>

              {/* Content */}
              <div className="relative z-10 mt-auto">
                <h2 className="text-xl font-bold uppercase tracking-widest mb-2">{category.name}</h2>
                <p className="text-white/50 text-xs tracking-wider mb-6 line-clamp-2 w-[80%]">{category.description}</p>
                
                <button className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#E11D48] md:text-white/70 group-hover:text-[#E11D48] transition-colors">
                  {loadingCategory === category.query ? (
                    <span className="animate-pulse">Loading Comparison...</span>
                  ) : (
                    <>
                      Compare Now
                      <svg className="w-4 h-4 transform translate-x-1 md:translate-x-0 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Categories;