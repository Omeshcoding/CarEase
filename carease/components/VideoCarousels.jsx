'use client';
import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { HiArrowUpRight } from 'react-icons/hi2';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const videoSlides = [
  {
    id: 'supercar',
    videoSrc: '/videos/lamborgini_by_Video_by_Mustafa_Akkuş.mp4',
    badge: 'Supercar Fleet // Track Telemetry',
    title: 'Bred For The Apex',
    desc: 'Pure atmospheric V10 exhilaration engineered with razor-sharp aerodynamic downforce and uncompromising track response.',
    telemetry: [
      '0-60 MPH: 2.9s',
      'V10 Naturally Aspirated',
      'Top Speed: 325+ KM/H',
    ],
    ctaText: 'Explore Supercars',
    ctaLink: '/carlist#superCars',
    num: '01',
    label: 'Supercar',
  },
  {
    id: 'truck',
    videoSrc: '/videos/Pickup_truck_Video_by_Jorge_Zaldívar_Marroquín.mp4',
    badge: 'All-Terrain Dominance // 4x4 Muscle',
    title: 'Raw Muscle & High Clearance',
    desc: 'Uncompromising twin-turbocharged muscle engineered to conquer unforgiving terrain with electronic locking differentials and adaptive damping.',
    telemetry: [
      'Electronic Locking 4x4',
      '700+ Nm Peak Torque',
      'High-Clearance Travel',
    ],
    ctaText: 'Explore All-Terrain Fleet',
    ctaLink: '/carlist',
    num: '02',
    label: 'All-Terrain',
  },
  {
    id: 'luxury',
    videoSrc: '/videos/RR_Video_by_Ammad_Rasool.mp4',
    badge: 'Pinnacle Sanctuary // V12 Majesty',
    title: 'Silence At 100 Miles An Hour',
    desc: "Handcrafted sanctuary with twin-turbocharged V12 serenity and acoustic double glazing, delivering CarEase's signature floating magic carpet experience.",
    telemetry: [
      '6.75L Twin-Turbo V12',
      'Acoustic Double Glazing',
      'Planar Air Suspension',
    ],
    ctaText: 'Explore Luxury Saloons',
    ctaLink: '/carlist#popularCars',
    num: '03',
    label: 'Luxury',
  },
];

const VideoCarousels = () => {
  return (
    <div className="w-full h-full relative bg-black select-none">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        grabCursor={true}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            const slide = videoSlides[index] || {
              num: `0${index + 1}`,
              label: 'Fleet',
            };
            return `<button class="${className} video-bullet"><span class="bullet-num">${slide.num}</span><span class="bullet-label hidden sm:inline ml-1.5">// ${slide.label}</span></button>`;
          },
        }}
        onSlideChange={(swiper) => {
          const activeSlide = swiper.slides[swiper.activeIndex];
          if (activeSlide) {
            const video = activeSlide.querySelector('video');
            if (video && video.paused) {
              video.play().catch(() => {});
            }
          }
        }}
        className="w-full h-full bg-black relative video-reel-swiper"
      >
        {videoSlides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="relative w-full h-full overflow-hidden bg-black"
          >
            {/* Background Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            >
              <source src={slide.videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Studio Vignette & Dark Atmospheric Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent pointer-events-none z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

            {/* Ambient Crimson Underglow Accent */}
            <div className="absolute -bottom-10 left-8 sm:left-14 w-80 sm:w-96 h-36 bg-[#E11D48]/15 blur-3xl rounded-full pointer-events-none z-10" />

            {/* Cinema Reel Editorial HUD */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-10 md:p-14 lg:p-16 pb-20 sm:pb-12 max-w-3xl pointer-events-none">
              <div className="flex flex-col gap-2.5 sm:gap-3.5 pointer-events-auto">
                {/* Telemetry Tag Badge */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#E11D48] bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-[#E11D48]/30 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse" />
                    {slide.badge}
                  </span>
                </div>

                {/* Headline */}
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-black italic tracking-tight text-white uppercase drop-shadow-2xl leading-none">
                  {slide.title}
                </h3>

                {/* Subtitle / Narrative */}
                <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-medium max-w-xl line-clamp-2 sm:line-clamp-none leading-relaxed drop-shadow">
                  {slide.desc}
                </p>

                {/* Telemetry HUD Pills */}
                <div className="hidden sm:flex flex-wrap items-center gap-2 pt-1">
                  {slide.telemetry.map((stat, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-bold text-neutral-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 tracking-wider uppercase shadow-sm"
                    >
                      {stat}
                    </span>
                  ))}
                </div>

                {/* Direct Action Link */}
                <div className="pt-2 flex items-center gap-4">
                  <Link
                    href={slide.ctaLink}
                    className="group inline-flex items-center gap-2 bg-[#E11D48] hover:bg-[#BE123C] text-white font-black text-xs sm:text-sm uppercase tracking-wider px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl shadow-lg shadow-[#E11D48]/30 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <span>{slide.ctaText}</span>
                    <HiArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoCarousels;
