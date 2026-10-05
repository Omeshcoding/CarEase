'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const FeaturedCarCard = ({
  model,
  imgUrl,
  badge = 'Showcase Trim',
  specs = [],
  search = model,
}) => {
  return (
    <div className="group relative flex flex-col items-center justify-between p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#161618] via-[#0d0d0f] to-black border border-white/10 hover:border-[#E11D48]/50 shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden w-full">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#E11D48]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#E11D48]/20 transition-all duration-500" />

      {/* Top Badge */}
      <div className="w-full flex justify-between items-center z-10 mb-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#E11D48] bg-[#E11D48]/10 px-3 py-1 rounded-full border border-[#E11D48]/30">
          {badge}
        </span>
        <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
          Telemetry Verified
        </span>
      </div>

      {/* Car Image + Floor Shadow */}
      <div className="w-full h-44 sm:h-48 flex flex-col items-center justify-center relative py-2 z-10">
        <Image
          src={imgUrl}
          height={220}
          width={360}
          alt={model}
          priority={false}
          className="w-full max-h-36 object-contain relative z-10 drop-shadow-xl group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
        />
        <div className="w-[80%] h-3 bg-black/90 blur-md rounded-[100%] mt-[-4px] pointer-events-none" />
      </div>

      {/* Model Name & Specs */}
      <div className="w-full text-center z-10 mt-3">
        <h3 className="text-xl sm:text-2xl font-black italic tracking-tight text-white uppercase group-hover:text-[#E11D48] transition-colors">
          {model}
        </h3>

        {/* Telemetry Pills */}
        {specs && specs.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-2 mt-3">
            {specs.map((spec, idx) => (
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
        )}
      </div>

      {/* Action CTA */}
      <Link
        href={`/carlist?search=${encodeURIComponent(search)}`}
        className="mt-6 w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-[#E11D48] border border-white/10 hover:border-[#E11D48] text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white transition-all text-center flex items-center justify-center gap-2 z-10"
      >
        <span>View Inventory</span>
        <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
};

export default FeaturedCarCard;
