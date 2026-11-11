'use client';
import React, { useState, useEffect } from 'react';

const FilterSidebar = () => {
  const [activeId, setActiveId] = useState('superCars');

  const menuItems = [
    { id: 'superCars', label: 'Super Cars' },
    { id: 'popularCars', label: 'Popular Cars' },
    { id: 'upcomingCars', label: 'Upcoming Cars' },
    { id: 'hatchbackCars', label: 'Hatchback Cars' },
  ];

  useEffect(() => {
    // Scroll Spy using Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When a section comes into view (at least 30% visible)
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-15% 0px -60% 0px', // Creates a "trigger zone" roughly in the upper middle of the screen
        threshold: 0
      }
    );

    // Observe all sections
    menuItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      // Offset by 100px to account for sticky headers or navbar
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-[250px] flex flex-col gap-6 ml-8 border-l border-white/10 md:px-6 xl:px-10 py-6 sticky top-32 z-20">
      <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Nav System</p>
      
      {menuItems.map((item) => (
        <div 
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={`cursor-pointer group flex items-center relative transition-all duration-300`}
        >
          {/* Active Indicator Line */}
          <div className={`absolute -left-[25px] xl:-left-[41px] w-[2px] h-full transition-all duration-300 ${activeId === item.id ? 'bg-[#E11D48] scale-y-100' : 'bg-transparent scale-y-0 group-hover:bg-white/20 group-hover:scale-y-50'}`}></div>
          
          <span className={`uppercase tracking-widest text-xs font-bold transition-all duration-300 ${activeId === item.id ? 'text-[#E11D48] translate-x-2' : 'text-white/50 group-hover:text-white group-hover:translate-x-1'}`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;
