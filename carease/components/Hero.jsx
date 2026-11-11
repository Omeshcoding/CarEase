'use client';
import React, { useEffect, useState } from 'react';
import HeroImage from '../public/images/Hero-carscompare.svg';
import Image from 'next/image';
import { IoSearchOutline } from 'react-icons/io5';
import axios from 'axios';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const OffroadTireIcon = ({ className, hubColor = '#111' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle
      cx="50"
      cy="50"
      r="45"
      stroke="currentColor"
      strokeWidth="10"
      strokeDasharray="12 8"
      strokeLinecap="butt"
    />
    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="10" />
    <circle
      cx="50"
      cy="50"
      r="28"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.6"
    />
    <path
      d="M50 50 L50 28 M50 50 L69 39 M50 50 L69 61 M50 50 L50 72 M50 50 L31 61 M50 50 L31 39"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <circle cx="50" cy="50" r="14" fill="currentColor" />
    <circle cx="50" cy="50" r="6" fill={hubColor} />
  </svg>
);

const Hero = () => {
  const [search, setSearch] = useState('');
  const [car, setCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showGuestToast, setShowGuestToast] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { data: session } = useSession();
  const router = useRouter();

  const models = car.filter((model) => {
    if (model?.model?.toUpperCase().includes(search.toUpperCase())) {
      return model;
    }
  });

  const handleKeyDown = (e) => {
    if (!search || models.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < models.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < models.length) {
        handleResultClick(e, models[selectedIndex].id);
      }
    }
  };

  const getSingleCar = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/getCar`).then((data) => data);
      if (!response.status === 'OK') {
        throw new Error('Network response was not ok');
      }
      const data = await response.data;
      setCarData(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (e, carId) => {
    e.preventDefault();
    const destination = `/single-car/${carId}`;
    if (session) {
      router.push(destination);
    } else {
      setShowGuestToast(true);
      try {
        sessionStorage.setItem('redirectAfterLogin', destination);
      } catch (_) {}
      setTimeout(() => setShowGuestToast(false), 5000);
    }
  };

  useEffect(() => {
    getSingleCar();
  }, []);

  return (
    <section className="h-[450px] md:h-[800px]">
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateX(-50%) translateY(4px); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        @keyframes spinFast { 100% { transform: rotate(360deg); } }
        @keyframes mudFly { 0% { transform: translate(0,0) scale(1); opacity:1; } 100% { transform: translate(15px,-10px) scale(0); opacity:0; } }
        .animate-spin-fast { animation: spinFast 0.5s linear infinite; }
        .animate-mud-fly { animation: mudFly 0.4s linear infinite; }
        .spec-label {
          font-family: inherit;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          fill: #111;
        }
        .spec-line { stroke: #111; stroke-width: 1.2; fill: none; opacity: 0.75; }
      `}</style>

      {/* Search + heading */}
      <div className="text-center mt-28 lg:w-[60%] mx-auto relative z-30">
        {showGuestToast && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[120%] w-64 bg-black border border-[#E11D48] text-white text-[12px] text-center rounded-lg px-4 py-3 shadow-[0_0_15px_rgba(225,29,72,0.4)] animate-fade-in pointer-events-auto">
            <span className="text-[#E11D48] font-bold text-sm">
              Login Required
            </span>
            <br />
            <Link
              href="/auth/login"
              className="underline font-bold hover:text-[#E11D48] transition-colors"
            >
              Login
            </Link>{' '}
            to view full vehicle details!
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black border-r border-b border-[#E11D48] rotate-45" />
          </div>
        )}
        <h1 className="text-4xl lg:text-5xl mb-10">
          <span className="text-[#E11D48] font-headings">
            {' '}
            Search and compare
          </span>{' '}
          cars
        </h1>

        <div className="relative w-[60%] mx-auto">
          <input
            type="text"
            value={search}
            className="bg-gray-300 h-12 lg:h-16 rounded-full w-[100%] pl-10 md:text-xl text-black outline-none text-sm"
            placeholder="cars"
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(-1);
            }}
            onKeyDown={handleKeyDown}
          />
          {search && (
            <div className="absolute flex flex-col bg-gray-200 rounded-lg shadow-lg w-[85%] ml-4 sm:w-[80%] sm:ml-10 md:ml-14 text-left px-6 py-3 -bottom-30 z-30">
              {models.length > 0 ? (
                models.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={(e) => handleResultClick(e, item?.id)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`text-sm md:text-lg cursor-pointer py-1.5 px-3 rounded-md transition-colors capitalize ${
                      selectedIndex === index
                        ? 'bg-[#E11D48] text-white'
                        : 'hover:bg-gray-300 text-black hover:text-black'
                    }`}
                  >
                    {item?.model}{' '}
                  </div>
                ))
              ) : (
                <div className="py-2 text-center text-gray-700">
                  <p className="font-bold text-sm text-[#E11D48]">
                    No vehicles found for &ldquo;{search}&rdquo;
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Try searching with different keywords, brand names, or categories (e.g., McLaren, BMW, SUV).
                  </p>
                </div>
              )}
            </div>
          )}
          {isLoading ? (
            <div className="text-[#E11D48] absolute z-20 right-5 top-2.5 lg:top-3.5 w-7 h-7 lg:w-9 lg:h-9">
              <div className="relative w-full h-full">
                <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#4A2511] rounded-full animate-mud-fly"></div>
                <div
                  className="absolute bottom-1 right-0 w-1 h-1 bg-[#654321] rounded-full animate-mud-fly"
                  style={{ animationDelay: '0.2s' }}
                ></div>
                <OffroadTireIcon
                  className="w-full h-full animate-spin-fast drop-shadow-md"
                  hubColor="transparent"
                />
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="text-black absolute z-20 text-2xl lg:text-4xl right-5 top-3"
            >
              <IoSearchOutline />
            </button>
          )}
        </div>
      </div>

      {/* Hero image + precision SVG callout overlay */}
      <div className="mt-24 relative w-full">
        <Image
          src={HeroImage}
          width={0}
          height={824}
          alt="Hero"
          className="w-full h-[160px] md:h-[424px] object-cover overflow-hidden"
        />

        {/* Single SVG overlay — same viewBox as the hero SVG (1317×386).
            Every coordinate below is a true pixel on the car image. */}
      </div>
    </section>
  );
};

export default Hero;
