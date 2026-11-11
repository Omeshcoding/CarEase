'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import 'swiper/css/effect-fade';

import SUV from '../public/images/SUV.webp';
import electricVehicle from '../public/images/Electric-SUV.webp';
import commercialVehicle from '../public/images/commercial-vehicle.webp';
import luxuryVehicle from '../public/images/luxury-vehicle.webp';

const OurBusiness = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      const items = [
        'Passenger Vehicles',
        'Electric Innovation',
        'Commercial Fleet',
        'Exotic & Luxury',
      ];
      return `<button class="${className} custom-bullet">${items[index]}</button>`;
    },
  };

  return (
    <div className="w-full my-8">
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        spaceBetween={0}
        speed={420}
        grabCursor={true}
        touchRatio={1.5}
        longSwipesRatio={0.2}
        shortSwipes={true}
        followFinger={true}
        resistance={true}
        resistanceRatio={0.85}
        threshold={2}
        touchAngle={45}
        className="w-full min-h-[740px] sm:min-h-[680px] md:min-h-[540px] lg:h-[560px] bg-gradient-to-br from-[#161618] via-[#0d0d0f] to-black border border-white/10 rounded-3xl shadow-2xl py-6 md:py-8 text-white relative overflow-hidden"
      >
        {/* Slide 1: Passenger / SUVs */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row py-4 sm:py-6 md:py-8 pb-36 sm:pb-32 md:pb-12 px-6 sm:px-10 md:px-14 lg:px-16 items-center justify-between h-full gap-6 md:gap-8 select-none">
            <div className="md:w-[50%] flex flex-col gap-4 text-left">
              <span className="text-xs font-black uppercase tracking-widest text-[#E11D48] bg-[#E11D48]/10 px-3 py-1 rounded-full border border-[#E11D48]/30 w-fit">
                Category Spotlight
              </span>
              <h3 className="text-3xl md:text-5xl font-black italic tracking-tight text-white uppercase">
                Versatile SUVs
              </h3>
              <h4 className="text-base md:text-lg font-bold tracking-wider text-neutral-300 uppercase">
                Everyday Reliability & Comfort
              </h4>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-lg">
                Cutting-edge engineering and modern comfort tailored for everyday journeys. Compare trim specs, fuel efficiency, and interior technologies side by side.
              </p>
              <Link
                href="/carlist"
                className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-[#E11D48] hover:text-white transition-colors w-fit pt-2 cursor-pointer relative z-30"
              >
                <span>Explore Passenger Vehicles</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
              </Link>
            </div>
            <div className="md:w-[50%] flex flex-col items-center justify-center relative py-2 md:py-4 mb-4 md:mb-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 bg-[#E11D48]/10 rounded-full blur-3xl pointer-events-none" />
              <Image
                src={SUV}
                width={480}
                height={320}
                alt="SUV"
                draggable={false}
                className="w-full max-w-[290px] sm:max-w-[380px] md:max-w-[440px] object-contain relative z-10 drop-shadow-xl pointer-events-none select-none"
              />
              <div className="w-[80%] h-4 bg-black/90 blur-lg rounded-[100%] mt-[-8px] pointer-events-none" />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2: Electric Vehicles */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row py-4 sm:py-6 md:py-8 pb-36 sm:pb-32 md:pb-12 px-6 sm:px-10 md:px-14 lg:px-16 items-center justify-between h-full gap-6 md:gap-8 select-none">
            <div className="md:w-[50%] flex flex-col gap-4 text-left">
              <span className="text-xs font-black uppercase tracking-widest text-[#E11D48] bg-[#E11D48]/10 px-3 py-1 rounded-full border border-[#E11D48]/30 w-fit">
                Zero Emissions
              </span>
              <h3 className="text-3xl md:text-5xl font-black italic tracking-tight text-white uppercase">
                Electric Power
              </h3>
              <h4 className="text-base md:text-lg font-bold tracking-wider text-neutral-300 uppercase">
                Instant Torque & Modern Telemetry
              </h4>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-lg">
                Step into the future of transportation with zero emissions, serene cabin acoustics, and high-voltage battery efficiency. Discover next-gen EV performance.
              </p>
              <Link
                href="/carlist"
                className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-[#E11D48] hover:text-white transition-colors w-fit pt-2 cursor-pointer relative z-30"
              >
                <span>Discover Electric Vehicles</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
              </Link>
            </div>
            <div className="md:w-[50%] flex flex-col items-center justify-center relative py-2 md:py-4 mb-4 md:mb-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 bg-[#E11D48]/10 rounded-full blur-3xl pointer-events-none" />
              <Image
                src={electricVehicle}
                width={480}
                height={320}
                alt="Electric SUV"
                draggable={false}
                className="w-full max-w-[290px] sm:max-w-[380px] md:max-w-[440px] object-contain relative z-10 drop-shadow-xl pointer-events-none select-none"
              />
              <div className="w-[80%] h-4 bg-black/90 blur-lg rounded-[100%] mt-[-8px] pointer-events-none" />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3: Commercial Fleet */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row py-4 sm:py-6 md:py-8 pb-36 sm:pb-32 md:pb-12 px-6 sm:px-10 md:px-14 lg:px-16 items-center justify-between h-full gap-6 md:gap-8 select-none">
            <div className="md:w-[50%] flex flex-col gap-4 text-left">
              <span className="text-xs font-black uppercase tracking-widest text-[#E11D48] bg-[#E11D48]/10 px-3 py-1 rounded-full border border-[#E11D48]/30 w-fit">
                Heavy Duty
              </span>
              <h3 className="text-3xl md:text-5xl font-black italic tracking-tight text-white uppercase">
                Commercial Fleet
              </h3>
              <h4 className="text-base md:text-lg font-bold tracking-wider text-neutral-300 uppercase">
                Rugged Durability & Hauling Authority
              </h4>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-lg">
                Engineered for maximum endurance and payload capability. No terrain is too challenging and no schedule too demanding for verified commercial workhorses.
              </p>
              <Link
                href="/carlist"
                className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-[#E11D48] hover:text-white transition-colors w-fit pt-2 cursor-pointer relative z-30"
              >
                <span>Discover Commercial Fleet</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
              </Link>
            </div>
            <div className="md:w-[50%] flex flex-col items-center justify-center relative py-2 md:py-4 mb-4 md:mb-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 bg-[#E11D48]/10 rounded-full blur-3xl pointer-events-none" />
              <Image
                src={commercialVehicle}
                width={480}
                height={320}
                alt="Commercial Vehicle"
                draggable={false}
                className="w-full max-w-[290px] sm:max-w-[380px] md:max-w-[440px] object-contain relative z-10 drop-shadow-xl pointer-events-none select-none"
              />
              <div className="w-[80%] h-4 bg-black/90 blur-lg rounded-[100%] mt-[-8px] pointer-events-none" />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4: Luxury & Exotic */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row py-4 sm:py-6 md:py-8 pb-36 sm:pb-32 md:pb-12 px-6 sm:px-10 md:px-14 lg:px-16 items-center justify-between h-full gap-6 md:gap-8 select-none">
            <div className="md:w-[50%] flex flex-col gap-4 text-left">
              <span className="text-xs font-black uppercase tracking-widest text-[#E11D48] bg-[#E11D48]/10 px-3 py-1 rounded-full border border-[#E11D48]/30 w-fit">
                Bespoke Prestige
              </span>
              <h3 className="text-3xl md:text-5xl font-black italic tracking-tight text-white uppercase">
                Luxury & Exotic
              </h3>
              <h4 className="text-base md:text-lg font-bold tracking-wider text-neutral-300 uppercase">
                Iconic Styling & Track Heritage
              </h4>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-lg">
                We curate premier global marques that define luxury performance and timeless motorsport design. Compare aerodynamic diagnostics and horsepower metrics.
              </p>
              <Link
                href="/comparison"
                className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-[#E11D48] hover:text-white transition-colors w-fit pt-2 cursor-pointer relative z-30"
              >
                <span>Compare Luxury Titans</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
              </Link>
            </div>
            <div className="md:w-[50%] flex flex-col items-center justify-center relative py-2 md:py-4 mb-4 md:mb-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 bg-[#E11D48]/10 rounded-full blur-3xl pointer-events-none" />
              <Image
                src={luxuryVehicle}
                width={480}
                height={320}
                alt="Luxury Vehicle"
                draggable={false}
                className="w-full max-w-[290px] sm:max-w-[380px] md:max-w-[440px] object-contain relative z-10 drop-shadow-xl pointer-events-none select-none"
              />
              <div className="w-[80%] h-4 bg-black/90 blur-lg rounded-[100%] mt-[-8px] pointer-events-none" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default OurBusiness;
