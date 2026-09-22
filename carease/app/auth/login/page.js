'use client';
import React, { useState, useEffect } from 'react';
import logo from '../../../public/images/logo.svg';
import google from '../../../public/images/google.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import ShowroomLoader from '@/components/ShowroomLoader';

const page = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    router.prefetch('/carlist');
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (result?.error) {
        setIsLoading(false);
        setErrorMessage('Invalid email or password. Please try again.');
        return;
      }

      // Check if the user was trying to access a specific page before login
      try {
        const redirectTo = sessionStorage.getItem('redirectAfterLogin');
        if (redirectTo) {
          sessionStorage.removeItem('redirectAfterLogin');
          router.push(redirectTo);
        } else {
          router.push('/carlist');
        }
      } catch (_) {
        router.push('/carlist');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="bg-signup-bg bg-cover min-h-screen text-black py-6 px-4 tracking-wide pt-24 relative">
      {/* Loading Overlay */}
      {isLoading && (
        <ShowroomLoader
          text="Entering Showroom..."
          subtext="Authenticating & Loading Inventory"
        />
      )}

      <div className="bg-white mx-auto w-[100%] sm:w-[428px] pb-6 pt-0 px-4 sm:px-14 rounded-lg shadow-xl">
        <Link href="/">
          <Image
            src={logo}
            width={100}
            height={100}
            alt="supercar"
            className="mx-auto cursor-pointer"
          />
        </Link>
        <div className="flex flex-col gap-2">
          <h4 className="text-[28px] font-semibold">Login</h4>

          <p className="text-[13.5px] mb-3 text-gray-600">
            Elevate your car buying experience. Enjoy the thrill to a better
            adventure.
          </p>

          {errorMessage && (
            <div className="bg-red-50 border border-[#E11D48] text-[#E11D48] text-xs font-semibold px-3 py-2 rounded-md text-center">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col gap-6">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => {
                setIsLoading(true);
                signIn('google');
              }}
              className="flex gap-2 border-2 w-full justify-center py-2 rounded-md text-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <Image src={google} width={30} height={30} alt="google" />
              Sign in with Google
            </button>
            <div className="relative">
              <hr className="absolute top-[50%] z-0 bg-gray-200 w-[15%] sm:w-[23%] h-[0.10rem]" />
              <p className="text-center z-30 text-gray-500 text-sm">Or Sign in with Email</p>
              <hr className="absolute right-0 top-[50%] z-0 bg-gray-200 w-[15%] sm:w-[23%] h-[0.10rem]" />
            </div>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="font-bold text-xs uppercase tracking-wider text-gray-700">EMAIL</label>
              <input
                value={user.email}
                type="email"
                required
                disabled={isLoading}
                placeholder="Enter Your Email Id"
                className="w-full h-[47.582px] flex-shrink-0 border-2 px-4 rounded-md mt-2 bg-transparent outline-none focus:border-[#E11D48] transition-colors disabled:opacity-50"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="relative">
              <label className="font-bold text-xs uppercase tracking-wider text-gray-700">PASSWORD</label>
              <input
                value={user.password}
                type={show ? 'text' : 'password'}
                required
                disabled={isLoading}
                placeholder="Enter Your Password"
                className="w-full h-[47.582px] flex-shrink-0 border-2 px-4 rounded-md mt-2 bg-transparent outline-none focus:border-[#E11D48] transition-colors disabled:opacity-50"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute top-[60%] right-3 text-[11.8px] font-bold text-gray-600 hover:text-black"
                onClick={() => setShow(!show)}
                onMouseLeave={() => setShow(false)}
              >
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="flex justify-between text-[11.8px] md:text-[12.8px] font-semibold">
              <Link href="/auth/forgetpassword" className="hover:text-black/80">
                Forgot Password ?
              </Link>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-btn_blue font-semibold text-black h-[47.58px] rounded-md hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Authenticating...' : 'Login'}
            </button>
          </form>

          <p className="text-[11.8px] text-gray-600 mt-2">
            Not register yet?{' '}
            <Link href="/auth/signup" className="font-bold text-black hover:underline">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default page;
