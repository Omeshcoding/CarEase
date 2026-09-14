'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGripLines, FaCog } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const OffroadTireIcon = ({ className, hubColor = '#111' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Outer Knobby Treads */}
    <circle
      cx="50"
      cy="50"
      r="45"
      stroke="currentColor"
      strokeWidth="10"
      strokeDasharray="12 8"
      strokeLinecap="butt"
    />
    {/* Thick Sidewall */}
    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="10" />
    {/* Inner Rim Lip */}
    <circle
      cx="50"
      cy="50"
      r="28"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.6"
    />
    {/* 6 Thick Rugged Spokes */}
    <path
      d="M50 50 L50 28 M50 50 L69 39 M50 50 L69 61 M50 50 L50 72 M50 50 L31 61 M50 50 L31 39"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
    />
    {/* Center Hub */}
    <circle cx="50" cy="50" r="14" fill="currentColor" />
    {/* Axle Hole */}
    <circle cx="50" cy="50" r="6" fill={hubColor} />
  </svg>
);

const ComparisonBadge = ({ mobile }) => {
  const [count, setCount] = useState(0);
  const [showGuestToast, setShowGuestToast] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const updateCount = () => {
    // If user is not logged in, always show 0
    if (status === 'unauthenticated') {
      setCount(0);
      return;
    }
    try {
      const history = JSON.parse(
        sessionStorage.getItem('compareHistory') || '[]',
      );
      setCount(history.length);
    } catch (e) {
      setCount(0);
    }
  };

  // Clear count immediately when user logs out
  useEffect(() => {
    if (status === 'unauthenticated') {
      setCount(0);
    } else if (status === 'authenticated') {
      updateCount();
    }
  }, [status]);

  useEffect(() => {
    updateCount();
    window.addEventListener('compareHistoryUpdated', updateCount);
    return () =>
      window.removeEventListener('compareHistoryUpdated', updateCount);
  }, []);

  // Update on route changes to ensure it's fresh
  useEffect(() => {
    updateCount();
  }, [pathname]);

  const handleClick = (e) => {
    e.preventDefault();

    if (session) {
      // Logged-in user → go directly to the recent comparison section
      router.push('/comparison#recent');
    } else {
      // Guest user → show a small login nudge toast
      setShowGuestToast(true);
      // Store where the user wanted to go so login can redirect back
      try {
        sessionStorage.setItem('redirectAfterLogin', '/comparison#recent');
      } catch (_) {}
      // Auto-hide toast after 3 seconds
      setTimeout(() => setShowGuestToast(false), 3000);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative flex items-center justify-center group cursor-pointer ${mobile ? 'md:hidden' : 'hidden md:flex mx-4 lg:mx-8'}`}
    >
      {/* Guest Login Nudge Toast */}
      {showGuestToast && (
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-44 bg-black border border-[#E11D48] text-white text-[11px] text-center rounded-lg px-3 py-2 z-50 shadow-[0_0_12px_rgba(225,29,72,0.4)] animate-fade-in">
          <span className="text-[#E11D48] font-bold">Login</span> to see your comparisons!
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black border-l border-t border-[#E11D48] rotate-45" />
        </div>
      )}

      <style>{`
        @keyframes dustCloud {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0.8; }
          100% { transform: translate(-35px, -25px) scale(4); opacity: 0; }
        }
        @keyframes dustCloudLow {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0.9; }
          100% { transform: translate(-40px, -10px) scale(5); opacity: 0; }
        }
        @keyframes mudSplashHigh {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translate(-30px, -25px) scale(0) rotate(240deg); opacity: 0; }
        }
        @keyframes mudSplashMid {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translate(-40px, -5px) scale(0) rotate(180deg); opacity: 0; }
        }
        @keyframes mudSplashLow {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translate(-25px, 20px) scale(0) rotate(120deg); opacity: 0; }
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateX(-50%) translateY(4px); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        
        .group:hover .animate-dust-1 { animation: dustCloud 0.5s cubic-bezier(0.25, 1, 0.5, 1) 2 forwards; }
        .group:hover .animate-dust-2 { animation: dustCloudLow 0.5s cubic-bezier(0.25, 1, 0.5, 1) 2 forwards 0.1s; }
        .group:hover .animate-kick-high { animation: mudSplashHigh 0.33s linear 3 forwards; }
        .group:hover .animate-kick-mid { animation: mudSplashMid 0.33s linear 3 forwards 0.1s; }
        .group:hover .animate-kick-low { animation: mudSplashLow 0.33s linear 3 forwards 0.15s; }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
      `}</style>

      <div
        className={`relative flex items-center justify-center ${mobile ? 'w-8 h-8' : 'w-12 h-12'} group-hover:scale-110 transition-transform duration-300`}
      >
        {/* Centripetal Wet Mud Splatter System */}
        {/* Irregular, elongated wet mist/spray */}
        <div className="absolute bottom-2 left-0 w-3 h-1.5 bg-[#8B4513] blur-[1px] rounded-[40%_60%_70%_30%] opacity-0 animate-dust-1 z-0"></div>
        <div className="absolute bottom-0 left-1 w-4 h-2 bg-[#5C4033] blur-[2px] rounded-[70%_30%_30%_70%] opacity-0 animate-dust-2 z-0"></div>

        {/* Jagged, tumbling mud streaks/clods (Multi-Directional Radial Fan) */}
        <div className="absolute bottom-1 left-0 w-3 h-1.5 bg-[#654321] rounded-[100%_20%_100%_20%] opacity-0 animate-kick-high z-0 shadow-[0_2px_2px_rgba(255,255,255,0.1)] border border-[#8B4513]/30"></div>
        <div className="absolute bottom-0 left-0 w-2.5 h-1 bg-[#4A2511] rounded-[40%_60%_70%_30%] opacity-0 animate-kick-mid z-0 shadow-[0_1px_1px_rgba(255,255,255,0.1)] border border-[#8B4513]/30"></div>
        <div className="absolute -bottom-1 left-1 w-2 h-2 bg-[#A0522D] rounded-[30%_70%_70%_30%] opacity-0 animate-kick-low z-0 shadow-[0_2px_2px_rgba(255,255,255,0.1)] border border-[#8B4513]/30"></div>
        <div className="absolute bottom-1 -left-1 w-2 h-1 bg-[#2C1E16] rounded-full opacity-0 animate-kick-mid z-0 delay-75"></div>

        {/* Small Back Wheel (Red 4x4 Tire) */}
        <OffroadTireIcon
          className="absolute top-0 right-0 text-[#E11D48] w-4 h-4 md:w-5 md:h-5 drop-shadow-md z-10 opacity-90 group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out"
          hubColor="transparent"
        />

        {/* Large Front Wheel (White 4x4 Tire) */}
        <OffroadTireIcon
          className="absolute bottom-0 left-0 text-white w-6 h-6 md:w-9 md:h-9 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] z-20 group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out"
          hubColor="#111"
        />
      </div>

      {/* Badge — only shown when logged in and count > 0 */}
      {session && count > 0 && (
        <span className="absolute -top-1 -right-3 md:-top-2 md:-right-4 bg-white text-[#E11D48] text-[10px] font-black w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full shadow-lg z-20">
          {count}
        </span>
      )}
    </div>
  );
};

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { data: session, status } = useSession();

  const handleLogout = () => {
    signOut({
      callbackUrl: '/auth/login',
    });
  };
  const toogleNavbar = () => {
    return setShow(!show);
  };

  return (
    <nav className="nav text-lg">
      <Link href="/">
        <Image
          src="/images/carease-logo.svg"
          width={10}
          height={10}
          alt="carease"
          className=" w-[100px] h-[45px] xl:w-[165px] "
        />
      </Link>
      <div className="flex items-center gap-10">
        <ComparisonBadge mobile={true} />
        <button
          type="button"
          className="ml-auto md:hidden text-white text-2xl"
          onClick={toogleNavbar}
        >
          {' '}
          {!show ? <FaGripLines /> : <IoClose />}
        </button>
      </div>
      {/* desktop navbar */}

      <div className="nav-desktop font-navItems  font-normal">
        {session && (
          <div className="flex items-center  text-lg gap-6 relative">
            <Link
              href="/carlist"
              className="bg-white px-8 py-1 rounded-full md:text-sm   nav-hover md:px-3 lg:text-lg lg:px-4 xl:px-8"
            >
              Carlist
            </Link>
            <Link
              href="/comparison"
              className=" text-white bg-[#E11D48] focus:bg-white focus:text-[#E11D48] px-8 py-1  rounded-full md:text-sm md:px-3 lg:text-lg lg:px-4 xl:px-8"
            >
              Compare
            </Link>
            <button
              className=" bg-white px-8 py-1 rounded-full md:text-sm hover:text-[#E11D48]  md:px-3 lg:text-lg lg:px-8 xl:px-8"
              onClick={() => setShow(!show)}
            >
              More
            </button>
            {show && (
              <div
                className="absolute bg-gradient-to-t to-white/80 from-[#343131]/80  text-black flex flex-col right-0 top-10 z-50 px-8 rounded-md py-8 shadow-xl gap-4 "
                onMouseLeave={() => setShow(false)}
              >
                <Link href="/category/supercars" className="nav-hover">
                  Super Cars
                </Link>
                <Link href="/category/popular" className="nav-hover">
                  Popular Cars
                </Link>
                <Link href="/category/upcoming" className="nav-hover">
                  Upcoming Cars
                </Link>
                <Link href="/category/hatchback" className="nav-hover">
                  Hatchback Cars
                </Link>
              </div>
            )}
          </div>
        )}
        <div className="xl:ml-auto">
          <div className="flex gap-6 items-center  ">
            <ComparisonBadge mobile={false} />
            {!session ? (
              <div className="flex gap-6 items-center  ">
                <Link
                  href="/auth/signup"
                  className=" bg-white px-8 py-1 rounded-full md:text-sm md:px-3 lg:text-lg lg:px-4 xl:px-8 nav-hover "
                >
                  Register
                </Link>

                <Link
                  href="/auth/login"
                  className=" bg-white px-8  py-1 rounded-full md:text-sm md:px-3 lg:text-lg lg:px-4 xl:px-8 nav-hover"
                >
                  Login
                </Link>
              </div>
            ) : (
              <Link
                href="/auth/login"
                onClick={handleLogout}
                className=" bg-white px-8  py-1 rounded-full md:text-sm md:px-3 lg:text-lg lg:px-4 xl:px-8 nav-hover"
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* mobile */}

      {show && (
        <div className="nav-mobile">
          {session && (
            <div className="flex items-center  flex-col xl:flex-row text-xl text-bold  gap-6 xl:ml-28">
              <Link href="/carlist" className="bg-white navlink">
                Carlist
              </Link>
              <Link
                href="/comparison"
                className=" text-white bg-[#E11D48] navlink"
              >
                Compare
              </Link>
              <Link href="/carlist" className=" bg-white navlink">
                More
              </Link>
            </div>
          )}
          <div className="xl:ml-auto">
            <div className="flex flex-col xl:flex-row gap-6 items-center  ">
              {!session ? (
                <div className="flex  flex-col gap-6 items-center  ">
                  <Link href="/auth/signup" className=" bg-white navlink px-4">
                    Register
                  </Link>

                  <Link href="/auth/login" className=" bg-white navlink">
                    Login
                  </Link>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={handleLogout}
                  className=" bg-white navlink"
                >
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
