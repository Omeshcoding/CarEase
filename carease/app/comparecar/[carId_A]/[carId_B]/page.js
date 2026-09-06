'use client';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CarSelectModal from '@/components/CarSelectModal';
import ComparisonTable from '@/components/ComparisonTable';

const ComparePage = ({ params }) => {
  const [carA, setCarA] = useState(null);
  const [carB, setCarB] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSwappingA, setIsSwappingA] = useState(false);
  const [isSwappingB, setIsSwappingB] = useState(false);
  const router = useRouter();

  const swapARef = useRef(null);
  const swapBRef = useRef(null);

  // Click outside to cancel swapping
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (swapARef.current && !swapARef.current.contains(event.target)) {
        setIsSwappingA(false);
      }
      if (swapBRef.current && !swapBRef.current.contains(event.target)) {
        setIsSwappingB(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Unpack params
  const { carId_A, carId_B } = params;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/compareCars/compare/${carId_A}/${carId_B}`,
        );
        const [dataA, dataB] = response.data;

        // Format names to remove ugly underscores from the DB
        if (dataA?.model) dataA.model = dataA.model.replace(/_/g, ' ');
        if (dataB?.model) dataB.model = dataB.model.replace(/_/g, ' ');

        setCarA(dataA);
        setCarB(dataB);

        // SILENT HISTORY SYNC: Save to sessionStorage for the Dashboard (clears on browser close)
        if (dataA && dataB) {
          try {
            const history = JSON.parse(sessionStorage.getItem('compareHistory') || '[]');
            const newEntry = {
              id: `${carId_A}-${carId_B}`,
              carA: { id: carId_A, name: dataA.model, image: dataA.imageUrl },
              carB: { id: carId_B, name: dataB.model, image: dataB.imageUrl },
              timestamp: Date.now()
            };
            // Remove duplicates (including reverse combinations)
            const filtered = history.filter(h => h.id !== `${carId_A}-${carId_B}` && h.id !== `${carId_B}-${carId_A}`);
            // Save top 3 recent
            sessionStorage.setItem('compareHistory', JSON.stringify([newEntry, ...filtered].slice(0, 3)));
            
            // Dispatch event for Navbar badge
            window.dispatchEvent(new Event('compareHistoryUpdated'));
          } catch (e) {
            console.error("Failed to save history", e);
          }
        }

      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [carId_A, carId_B]);

  // Handle swapping without mixing up sides
  const handleSwapA = (newId) => {
    router.push(`/comparecar/${newId}/${carId_B}`);
  };

  const handleSwapB = (newId) => {
    router.push(`/comparecar/${carId_A}/${newId}`);
  };

  // Helper to parse arrays like '["Power Liftgate", "Heated Seats"]' seamlessly
  const parseSpec = (val) => {
    if (!val) return 'N/A';
    if (typeof val === 'string' && val.startsWith('[')) {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed.join(', ');
      } catch {
        return val;
      }
    }
    return val;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[#E11D48] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="tracking-widest uppercase text-white/50">
            Initializing Telemetry...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#111111] via-black to-black text-white overflow-x-hidden pb-32">
      {/* HERO STANDOFF SECTION */}
      <div className="relative z-30 w-full pt-32 sm:pt-40 lg:pt-32 pb-16 px-2 sm:px-4 lg:px-16 flex flex-col items-center">
        <div className="relative z-30 w-full max-w-7xl flex flex-col items-center gap-4 lg:gap-8">
          {/* ROW 1: IMAGES & SPOTLIGHTS */}
          <div className="w-full flex flex-row justify-between items-end gap-2 lg:gap-4 relative z-10">
            {/* Background VS Watermark */}
            <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none opacity-5 lg:opacity-10">
              <h1 className="text-[100px] sm:text-[150px] lg:text-[400px] font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-black">
                VS
              </h1>
            </div>

            {/* CAR A IMAGE */}
            <div className="w-[48%] flex flex-col items-center relative group">
              {/* Spotlight */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] lg:w-[500px] lg:h-[500px] bg-white opacity-20 blur-[60px] lg:blur-[120px] rounded-full z-0 pointer-events-none"></div>

              <div className="relative w-full flex justify-center">
                <Image
                  src={carA?.imageUrl}
                  width={800}
                  height={500}
                  alt={carA?.model || 'Car A'}
                  className="w-[100%] h-[100px] sm:h-[200px] lg:h-[400px] xl:h-[500px] object-contain relative z-10 transform scale-x-[-1]"
                  priority
                />
                {/* Floor Shadow */}
                <div className="absolute bottom-0 translate-y-2 lg:translate-y-6 w-[80%] h-4 lg:h-12 bg-black/90 blur-lg lg:blur-xl rounded-[100%] z-0 pointer-events-none transform scale-y-50"></div>
              </div>
            </div>

            {/* VS Divider Line for Desktop */}
            <div className="hidden lg:flex w-[4%] justify-center items-center h-full z-20">
              <div className="h-[300px] w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            </div>

            {/* CAR B IMAGE */}
            <div className="w-[48%] flex flex-col items-center relative group">
              {/* Spotlight */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] lg:w-[500px] lg:h-[500px] bg-white opacity-20 blur-[60px] lg:blur-[120px] rounded-full z-0 pointer-events-none"></div>

              <div className="relative w-full flex justify-center">
                <Image
                  src={carB?.imageUrl}
                  width={800}
                  height={500}
                  alt={carB?.model || 'Car B'}
                  className="w-[100%] h-[100px] sm:h-[200px] lg:h-[400px] xl:h-[500px] object-contain relative z-10"
                  priority
                />
                {/* Floor Shadow */}
                <div className="absolute bottom-0 translate-y-2 lg:translate-y-6 w-[80%] h-4 lg:h-12 bg-black/90 blur-lg lg:blur-xl rounded-[100%] z-0 pointer-events-none transform scale-y-50"></div>
              </div>
            </div>
          </div>

          {/* ROW 2: TITLES */}
          <div className="w-full flex flex-row justify-between items-end gap-2 lg:gap-4 z-20 mt-2 lg:-mt-4">
            {/* CAR A TITLE */}
            <div className="w-[48%] flex flex-col items-center justify-end">
              <h2 className="text-xs sm:text-xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-widest text-center">
                <span className="font-light text-white/50 block text-[8px] sm:text-sm lg:text-lg mb-1 lg:mb-2">
                  {carA?.category}
                </span>
                {carA?.model}
              </h2>
            </div>

            {/* VS DIVIDER (Hidden on mobile) */}
            <div className="hidden lg:flex w-[4%] justify-center items-center"></div>

            {/* CAR B TITLE */}
            <div className="w-[48%] flex flex-col items-center justify-end">
              <h2 className="text-xs sm:text-xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-widest text-center">
                <span className="font-light text-white/50 block text-[8px] sm:text-sm lg:text-lg mb-1 lg:mb-2">
                  {carB?.category}
                </span>
                {carB?.model}
              </h2>
            </div>
          </div>

          {/* ROW 3: SWAP INPUTS */}
          <div className="w-full flex flex-row justify-between items-center gap-2 lg:gap-4 z-30 mb-2 lg:mb-8">
            <div
              ref={swapARef}
              className="w-[48%] flex justify-center h-[50px] items-center"
            >
              {isSwappingA ? (
                <div className="w-full sm:w-[90%] lg:w-[80%] animate-fade-in">
                  <CarSelectModal
                    model={null}
                    excludeIds={[carId_A, carId_B]}
                    isNavigationMode={false}
                    onSelect={handleSwapA}
                    darkTheme={true}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setIsSwappingA(true)}
                  className="px-4 py-2 lg:px-8 lg:py-3 border border-[#E11D48] text-[#E11D48] hover:bg-[#E11D48] hover:text-white rounded-full font-bold uppercase tracking-[0.1em] lg:tracking-widest text-[8px] lg:text-xs transition-all duration-300 flex items-center gap-2"
                >
                  <svg
                    className="w-3 h-3 lg:w-4 lg:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                  Change Vehicle
                </button>
              )}
            </div>

            <div className="hidden lg:flex w-[4%] justify-center items-center"></div>

            <div
              ref={swapBRef}
              className="w-[48%] flex justify-center h-[50px] items-center"
            >
              {isSwappingB ? (
                <div className="w-full sm:w-[90%] lg:w-[80%] animate-fade-in">
                  <CarSelectModal
                    model={null}
                    excludeIds={[carId_A, carId_B]}
                    isNavigationMode={false}
                    onSelect={handleSwapB}
                    darkTheme={true}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setIsSwappingB(true)}
                  className="px-4 py-2 lg:px-8 lg:py-3 border border-[#E11D48] text-[#E11D48] hover:bg-[#E11D48] hover:text-white rounded-full font-bold uppercase tracking-[0.1em] lg:tracking-widest text-[8px] lg:text-xs transition-all duration-300 flex items-center gap-2"
                >
                  <svg
                    className="w-3 h-3 lg:w-4 lg:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                  Change Vehicle
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* GLASSMORPHISM SPECIFICATION ENGINE (Extracted to Component) */}
      <ComparisonTable carA={carA} carB={carB} parseSpec={parseSpec} />
    </section>
  );
};

export default ComparePage;
