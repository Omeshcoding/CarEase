'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import CompareButton from '@/components/CompareButton';
import CarSelectModal from '@/components/CarSelectModal';
import Categories from '@/components/Categories';
import SpecificationTab from '@/components/SpecificationTab';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SingleCarClient = ({ car, carId }) => {
  const [showCompare, setShowCompare] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [allCars, setAllCars] = useState([]);
  const router = useRouter();
  const actionContainerRef = useRef(null);

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionContainerRef.current &&
        !actionContainerRef.current.contains(event.target)
      ) {
        setShowCompare(false);
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch all cars to enable Prev/Next functionality
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/getCar');
        setAllCars(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCars();
  }, []);

  const handleNext = () => {
    if (allCars.length === 0) return;
    const currentIndex = allCars.findIndex((c) => c.id === carId);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % allCars.length;
    router.push(`/single-car/${allCars[nextIndex].id}`);
  };

  const handlePrev = () => {
    if (allCars.length === 0) return;
    const currentIndex = allCars.findIndex((c) => c.id === carId);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + allCars.length) % allCars.length;
    router.push(`/single-car/${allCars[prevIndex].id}`);
  };

  // Splitting the single 'model' string into Brand and ModelName for creative styling
  const fullModelName = car?.model || '';
  const firstSpaceIndex = fullModelName.indexOf(' ');
  const brand =
    firstSpaceIndex !== -1
      ? fullModelName.substring(0, firstSpaceIndex)
      : fullModelName;
  const modelName =
    firstSpaceIndex !== -1 ? fullModelName.substring(firstSpaceIndex + 1) : '';

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="relative w-[100%] h-auto min-h-screen sm:px-4 lg:px-16 py-20 sm:py-16 lg:py-32 px-4 bg-gradient-to-br from-[#111111] via-black to-black overflow-hidden">
        {/* Vertical Side Text (Avant-Garde Premium Branding) */}
        <div className="absolute top-[85%] left-8 transform -translate-y-1/2 -rotate-90 origin-left z-0 pointer-events-none select-none hidden xl:block">
          <p className="text-white/20 text-4xl uppercase tracking-[0.3em] font-black flex items-center gap-4 whitespace-nowrap">
            <span className="w-20 h-[2px] bg-white/20 inline-block"></span>
            {brand} <span className="font-light">{modelName}</span>
          </p>
        </div>

        {/* Main Content: Specs HUD on left, Image on right */}
        <div className="flex flex-col-reverse lg:flex-row lg:items-start lg:justify-between pt-16 lg:pt-10 gap-10 relative z-10">
          {/* Left Side: Our new Specs HUD & Action Bar */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6 relative z-30">
            <SpecificationTab
              specifications={car?.specifications}
              modelName={car?.model}
            />

            {/* Action Bar (Compare / Search) underneath the SpecificationTab */}
            <div
              ref={actionContainerRef}
              className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 w-full"
            >
              {/* Search Car Mode */}
              <div className="relative w-full">
                <button
                  onClick={() => {
                    setShowSearch(!showSearch);
                    setShowCompare(false);
                  }}
                  className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 backdrop-blur-md rounded-full text-white font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  Search Cars
                </button>
                {showSearch && (
                  <div className="absolute top-full mt-3 left-0 w-full sm:w-[300px] bg-white rounded-3xl shadow-2xl z-40">
                    <CarSelectModal
                      model={null}
                      carId={null}
                      isNavigationMode={true}
                    />
                  </div>
                )}
              </div>

              {/* Compare Mode */}
              <div className="relative w-full">
                <button
                  onClick={() => {
                    setShowCompare(!showCompare);
                    setShowSearch(false);
                  }}
                  className="w-full px-8 py-3 border border-[#E11D48] text-[#E11D48] hover:bg-[#E11D48] hover:text-white rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                  Compare
                </button>
                {showCompare && (
                  <div className="absolute top-full mt-3 left-0 w-full sm:w-[300px] bg-white rounded-3xl shadow-2xl z-40">
                    <CarSelectModal model={car?.model} carId={carId} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Car Image & Side Chevrons (Flex Layout) */}
          <div className="w-full lg:w-2/3 flex flex-col items-center justify-center mt-8 lg:mt-0 relative">
            {car?.imageUrl && (
              <div className="flex items-center w-full justify-between group">
                {/* PREV Chevron (Dedicated Column) */}
                <div className="w-[10%] sm:w-[15%] flex justify-start z-30">
                  <button
                    onClick={handlePrev}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/5 hover:bg-white/20 border border-white/10 backdrop-blur-md rounded-full p-3 sm:p-4 lg:p-5 text-white shadow-xl hover:scale-110 flex-shrink-0"
                  >
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      ></path>
                    </svg>
                  </button>
                </div>

                {/* Car Image (Dedicated Column) */}
                <div className="relative flex flex-col items-center w-[80%] sm:w-[70%]">
                  {/* Intense Glowing Sun Effect Behind the Car */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[700px] lg:h-[700px] bg-white opacity-25 blur-[140px] rounded-full z-0 pointer-events-none"></div>

                  <Image
                    src={car.imageUrl}
                    width={1200}
                    height={800}
                    alt="car"
                    quality={100}
                    priority={true}
                    className="w-full h-[250px] sm:h-[350px] lg:h-[450px] xl:h-[550px] object-contain relative z-10"
                  />

                  {/* Ultra-realistic Grounded Floor Shadow */}
                  <div className="absolute bottom-0 translate-y-4 lg:translate-y-8 w-[80%] lg:w-[90%] h-12 lg:h-20 bg-black/90 blur-2xl rounded-[100%] z-0 pointer-events-none transform scale-y-50"></div>
                </div>

                {/* NEXT Chevron (Dedicated Column) */}
                <div className="w-[10%] sm:w-[15%] flex justify-end z-30">
                  <button
                    onClick={handleNext}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/5 hover:bg-white/20 border border-white/10 backdrop-blur-md rounded-full p-3 sm:p-4 lg:p-5 text-white shadow-xl hover:scale-110 flex-shrink-0"
                  >
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Remove py-[50px] padding so it sits flush against the dark background */}
      <section>
        <Categories />
      </section>
    </div>
  );
};

export default SingleCarClient;
