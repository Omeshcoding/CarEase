'use client';
import Categories from "@/components/Categories";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CarSelectModal from '@/components/CarSelectModal';

import NumOne from '@/public/images/1.svg';
import NumTwo from '@/public/images/2.svg';
import NumThree from '@/public/images/3.svg';
import NumFour from '@/public/images/4.svg';
import IPhoneFrame01 from '@/public/images/iPhoneFrame-01.svg';
import IPhoneFrame02 from '@/public/images/iPhoneFrame-02.svg';

const Comparison = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCarA, setNewCarA] = useState(null);
  const [newCarB, setNewCarB] = useState(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem('compareHistory') || '[]');
      setHistory(stored);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, []);

  const clearHistory = () => {
    sessionStorage.removeItem('compareHistory');
    setHistory([]);
    window.dispatchEvent(new Event('compareHistoryUpdated'));
  };

  const removeComparison = (e, id) => {
    e.stopPropagation();
    const newHistory = history.filter(item => item.id !== id);
    sessionStorage.setItem('compareHistory', JSON.stringify(newHistory));
    setHistory(newHistory);
    window.dispatchEvent(new Event('compareHistoryUpdated'));
  };

  const handleStartComparison = () => {
    if (newCarA && newCarB) {
      router.push(`/comparecar/${newCarA}/${newCarB}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-32">
      {/* DASHBOARD HERO SECTION */}
      <section className='w-full min-h-[525px] pt-32 pb-16 px-4 flex flex-col items-center justify-start gap-12 relative overflow-hidden'>
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-[#E11D48] opacity-5 blur-[150px] pointer-events-none"></div>

        {/* PERMANENT SELECTOR TOOL */}
        <div className="w-full max-w-4xl z-20 flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 lg:p-12 backdrop-blur-md">
            
            {/* Logo-inspired Header */}
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tighter mb-8 md:mb-10 uppercase'>
              <span className="text-white">Compare</span>
              <span className="text-[#E11D48]">Vehicles</span>
            </h1>
            
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 mb-8 md:mb-10 z-30">
               <div className="w-full md:w-[45%] text-left">
                 <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-3">Vehicle 1</p>
                 <CarSelectModal model={null} excludeIds={newCarB ? [newCarB] : []} isNavigationMode={false} onSelect={setNewCarA} darkTheme={true} />
               </div>
               <div className="text-xl font-light italic text-white/40">VS</div>
               <div className="w-full md:w-[45%] text-left">
                 <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-3">Vehicle 2</p>
                 <CarSelectModal model={null} excludeIds={newCarA ? [newCarA] : []} isNavigationMode={false} onSelect={setNewCarB} darkTheme={true} />
               </div>
            </div>

            <button 
              onClick={handleStartComparison}
              disabled={!newCarA || !newCarB}
              className={`px-6 py-3 md:px-10 md:py-4 text-xs md:text-sm rounded-full font-bold uppercase tracking-widest transition-all duration-300 z-10 ${
                newCarA && newCarB 
                  ? 'bg-[#E11D48] text-white hover:bg-white hover:text-black hover:scale-105 shadow-[0_0_25px_rgba(225,29,72,0.3)]' 
                  : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
              }`}
            >
              Start Comparison
            </button>
        </div>

        {/* RECENT COMPARISONS HISTORY (Only shows if history exists) */}
        {!loading && history.length > 0 && (
          <div id="recent" className="w-full max-w-6xl z-10 flex flex-col gap-6 mt-8">
            {/* Flexible Header for Mobile Wrapping */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-2 border-b border-white/10 pb-4 px-2">
              <div>
                <h2 className='text-lg sm:text-xl lg:text-2xl font-bold tracking-widest uppercase'>Recent Comparisons</h2>
                <p className="text-white/40 text-[10px] mt-1 tracking-widest uppercase">Cleared automatically when session ends</p>
              </div>
              <button onClick={clearHistory} className="text-xs text-white/40 hover:text-white underline underline-offset-4 tracking-wider transition-colors mb-1 whitespace-nowrap">
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {history.map((item) => (
                <div key={item.id} onClick={() => router.push(`/comparecar/${item.carA.id}/${item.carB.id}`)} className="group cursor-pointer bg-white/5 border border-white/10 hover:border-[#E11D48]/50 rounded-2xl p-4 lg:p-6 transition-all duration-300 flex flex-col relative overflow-hidden backdrop-blur-md">
                   {/* Remove Single Card Button (Red and Prominent) */}
                   <button 
                     onClick={(e) => removeComparison(e, item.id)} 
                     className="absolute top-3 right-3 text-[#E11D48] hover:text-red-400 z-20 p-2 bg-black/60 hover:bg-black rounded-full transition-all"
                     title="Remove from history"
                   >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                   </button>

                   {/* Card BG Hover Glow */}
                   <div className="absolute inset-0 bg-gradient-to-br from-[#E11D48]/0 to-[#E11D48]/0 group-hover:from-[#E11D48]/10 group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
                   
                   <div className="flex flex-row justify-between items-center mb-6 z-10 relative mt-2">
                     <div className="w-[45%] flex flex-col items-center text-center">
                        <div className="h-[70px] sm:h-[90px] relative w-full flex justify-center items-end">
                           <Image src={item.carA.image} alt={item.carA.name} width={200} height={100} className="object-contain h-full transform scale-x-[-1]" />
                        </div>
                        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-2 line-clamp-2">{item.carA.name}</p>
                     </div>
                     <div className="w-[10%] flex justify-center text-[#E11D48] font-black italic text-lg opacity-50 group-hover:opacity-100 transition-opacity">VS</div>
                     <div className="w-[45%] flex flex-col items-center text-center">
                        <div className="h-[70px] sm:h-[90px] relative w-full flex justify-center items-end">
                           <Image src={item.carB.image} alt={item.carB.name} width={200} height={100} className="object-contain h-full" />
                        </div>
                        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-2 line-clamp-2">{item.carB.name}</p>
                     </div>
                   </div>
                   
                   <div className="w-full flex justify-center z-10">
                     <div className="border border-white/20 text-white/80 group-hover:border-[#E11D48] group-hover:text-white px-6 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all">
                       View Comparison
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* CURATED MATCHUPS SECTION (Now Dark Mode) */}
      <Categories />

      {/* INSTRUCTIONS SECTION - CONVERTED TO DARK MODE FOR SEAMLESS FLOW */}
      <div className="bg-[#0a0a0a] text-white border-t border-white/5 pb-24">
        <section className='p-2 md:px-16 max-w-7xl mx-auto'>
            <h1 className='my-12 text-2xl lg:text-3xl font-bold tracking-widest uppercase text-center md:text-left'>Already know what you're looking for?</h1>
            <div className='flex flex-col text-sm sm:text-lg md:justify-center text-center md:text-left text-white/70 gap-16'>
              
              <div className="w-full md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-start gap-4 md:w-1/2 text-left">                
                  <Image src={NumOne} width={20} height={20} alt="numOne" className="w-6 md:w-8 mt-1" />                
                  <h2 className="text-xl md:text-2xl font-semibold text-white/90">Search for cars that you'd like to compare</h2>
                </div>
                <div className="md:w-1/2 flex justify-center lg:justify-end">
                  <Image src={IPhoneFrame01} width={250} height={450} alt="imgOne" className="drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]" />
                </div>
              </div>

              <div className="w-full md:px-12 flex flex-col-reverse md:flex-row justify-between items-center gap-8">
                <div className="md:w-1/2 flex justify-center lg:justify-start">
                  <Image src={IPhoneFrame02} width={250} height={450} alt="imgOne" className="drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]" />              
                </div>
                <div className="flex items-start gap-4 md:w-1/2 text-left">
                  <Image src={NumTwo} width={20} height={20} alt="numTwo" className="w-6 md:w-8 mt-1" />
                  <h2 className="text-xl md:text-2xl font-semibold text-white/90">Tap Compare. You're done. No really, you are</h2>
                </div>
              </div>

              <div className="w-full md:px-12 flex flex-col md:flex-row justify-between items-start gap-12 mt-8">
                <div className="flex items-start gap-4 md:w-[45%] text-left">                
                  <Image src={NumThree} width={20} height={20} alt="numThree" className="w-6 md:w-8 mt-1" />
                  <h2 className="text-lg md:text-xl text-white/80 leading-relaxed">A huge comparison table comes up, allowing you to compare components and specs for each car.</h2>
                </div>
                <div className="flex items-start gap-4 md:w-[45%] text-left">
                  <Image src={NumFour} width={20} height={20} alt="numFour" className="w-6 md:w-8 mt-1" />
                  <h2 className="text-lg md:text-xl text-white/80 leading-relaxed">Want to delve into a car more? Click on the car's name to view in-depth info, reviews, prices, specification, images and more.</h2>
                </div>
              </div>

            </div>
        </section>
      </div>
    </div>    
  )
}

export default Comparison;