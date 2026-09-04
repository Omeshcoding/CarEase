'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import CompareCarModel from './CarSelectModal';

const Card = ({ tag, imageUrl, model, carId }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative w-full sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[500px] flex flex-col text-center flex-wrap my-6 mx-4 md:mx-0 group"
      onMouseLeave={() => setShow(false)}
    >
      <div className="mt-6 flex items-center justify-center h-[350px] md:h-[400px] xl:h-[450px] bg-white/5 border border-white/10 rounded-3xl relative px-6 shadow-md group-hover:border-[#E11D48]/50 group-hover:shadow-[0_0_30px_rgba(225,29,72,0.15)] transition-all duration-500 overflow-visible backdrop-blur-sm">
        
        {/* Category Tag */}
        <p className="uppercase text-center bg-[#E11D48] rounded-bl-2xl rounded-tr-3xl w-[120px] md:w-[160px] absolute top-0 pt-2 pb-2 text-white right-0 text-[10px] md:text-xs z-20 font-black tracking-widest shadow-lg">
          {tag}
        </p>

        {/* Floating Car Image & Spotlight */}
        <div className="w-full relative transform group-hover:scale-110 group-hover:-translate-y-4 transition-all duration-500 ease-out z-10 flex justify-center mb-8">
          
          {/* Intense Glowing Spotlight Behind the Car */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] md:w-[250px] md:h-[250px] bg-white opacity-5 group-hover:opacity-15 blur-[50px] rounded-full z-0 pointer-events-none transition-opacity duration-500"></div>

          <Image
            src={imageUrl}
            width={600}
            height={400}
            alt={model}
            priority={false}
            quality={90}
            className="w-full max-h-[220px] md:max-h-[260px] xl:max-h-[300px] object-contain drop-shadow-2xl relative z-10"
          />
        </div>
        
        {/* Floor Shadow for 3D Effect */}
        <div className="absolute bottom-16 md:bottom-20 w-[60%] h-4 bg-black/80 blur-xl rounded-[100%] z-0 pointer-events-none transform scale-y-50 group-hover:scale-y-100 group-hover:w-[70%] transition-all duration-500"></div>

        {/* Model Name */}
        <p className="absolute left-1/2 transform -translate-x-1/2 bottom-4 md:bottom-6 text-sm text-white font-black uppercase md:text-xl lg:text-2xl tracking-widest w-[90%] px-2 z-20 leading-tight">
          {model}
        </p>
      </div>

      <div className="flex px-2 mt-6 gap-2 md:gap-4">
        <Link href={`/single-car/${carId}`} className="flex-1 flex">
          <button className="w-full h-full py-3 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white transition-colors uppercase tracking-widest text-[10px] sm:text-xs font-bold flex items-center justify-center">
            View Model
          </button>
        </Link>
        <button
          onClick={() => setShow(!show)}
          className="flex-1 py-3 rounded-full bg-white/5 border border-white/10 text-[#E11D48] hover:bg-[#E11D48] hover:text-white transition-colors uppercase tracking-widest text-[10px] sm:text-xs font-bold flex items-center justify-center"
        >
          Compare
        </button>
      </div>
      
      {show && (
        <div className="absolute w-[90%] sm:w-[80%] left-1/2 transform -translate-x-1/2 bottom-[4.5rem] bg-[#111111] border border-white/10 rounded-2xl text-white outline-none shadow-2xl z-30 overflow-hidden p-2 animate-fade-in">
          <CompareCarModel carId={carId} model={model} darkTheme={true} />
        </div>
      )}
    </div>
  );
};

export default Card;
