import React from 'react';
import Card from './Card';

import Link from 'next/link';

const CategoryComponent = ({ carData, desc }) => {
  if (!carData || carData.length === 0) return null;

  return (
    <div className="my-20 md:px-10 mx-1">
      <div className="mx-4 sm:mx-10 border-b border-white/10 pb-6 mb-10">
        <div className="flex items-end justify-between font-normal">
          <h4 className="text-2xl md:text-4xl font-black italic tracking-widest text-white uppercase">
            {carData[0]?.category}
          </h4>
          <Link
            href={`/category/${carData[0]?.category}`}
            className="text-white/50 hover:text-[#E11D48] transition-colors uppercase tracking-widest text-[10px] sm:text-xs font-bold flex items-center gap-2"
          >
            <p>View all</p>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
        </div>
        <p className="text-white/50 mt-4 md:max-w-[70%] text-xs sm:text-sm tracking-widest uppercase leading-relaxed">{desc}</p>
      </div>
      <div className="flex justify-around gap-10 flex-wrap h-auto">
        {carData.map((car) => {
          return (
            <Card
              key={car._id}
              tag={car.category}
              imageUrl={car.imageUrl}
              model={car.model}
              carId={car._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryComponent;
