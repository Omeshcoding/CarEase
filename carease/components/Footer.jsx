import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/images/logo.svg';
import { PiFacebookLogoBold } from 'react-icons/pi';
import { CiTwitter } from 'react-icons/ci';
import { FaInstagram } from 'react-icons/fa';
import { RxDiscordLogo } from 'react-icons/rx';

const Footer = () => {
  const socialIcons = [
    {
      id: 'facebook',
      icon: <PiFacebookLogoBold className="w-5 h-5" />,
      href: 'https://facebook.com',
      label: 'Facebook',
    },
    {
      id: 'instagram',
      icon: <FaInstagram className="w-5 h-5" />,
      href: 'https://instagram.com',
      label: 'Instagram',
    },
    {
      id: 'discord',
      icon: <RxDiscordLogo className="w-5 h-5" />,
      href: 'https://discord.com',
      label: 'Discord',
    },
    {
      id: 'twitter',
      icon: <CiTwitter className="w-5 h-5" />,
      href: 'https://twitter.com',
      label: 'Twitter',
    },
  ];

  return (
    <footer className="w-full bg-black text-white border-t border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand Identity & Mission (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/" className="inline-block w-fit">
              <Image
                src={logo}
                width={130}
                height={40}
                alt="CarEase"
                className="h-10 w-auto object-contain cursor-pointer"
              />
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              Your premier automotive platform for precision vehicle comparisons, in-depth specifications, and market discovery. Compare rivals head-to-head with verified telemetry.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialIcons.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#E11D48] hover:bg-[#E11D48] text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Explore Fleet */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#E11D48]">
              Explore Fleet
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-neutral-400">
              <li>
                <Link href="/carlist" className="hover:text-white transition-colors">
                  All Vehicles
                </Link>
              </li>
              <li>
                <Link href="/carlist#superCars" className="hover:text-white transition-colors">
                  Supercars
                </Link>
              </li>
              <li>
                <Link href="/category/popular" className="hover:text-white transition-colors">
                  Popular Cars
                </Link>
              </li>
              <li>
                <Link href="/category/hatchback" className="hover:text-white transition-colors">
                  Hatchbacks
                </Link>
              </li>
              <li>
                <Link href="/carlist#upcomingCars" className="hover:text-white transition-colors">
                  Upcoming Releases
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Comparison Hub */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#E11D48]">
              Comparison Hub
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-neutral-400">
              <li>
                <Link href="/comparison" className="hover:text-white transition-colors">
                  Comparison Tool
                </Link>
              </li>
              <li>
                <Link href="/comparison#recent" className="hover:text-white transition-colors">
                  Recent Matchups
                </Link>
              </li>
              <li>
                <Link href="/#featured" className="hover:text-white transition-colors">
                  Featured Showdowns
                </Link>
              </li>
              <li>
                <Link href="/#brands" className="hover:text-white transition-colors">
                  Popular Brands
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Account & Info */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#E11D48]">
              Account & Info
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-neutral-400">
              <li>
                <Link href="/auth/login" className="hover:text-white transition-colors">
                  Sign In / Register
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  About CarEase
                </Link>
              </li>
              <li>
                <a href="mailto:support@carease.com" className="hover:text-white transition-colors">
                  Support & Inquiries
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} CarEase Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span>•</span>
            <span className="hover:text-neutral-400 cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span>•</span>
            <span className="hover:text-neutral-400 cursor-pointer transition-colors">
              Telemetry Standards
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
