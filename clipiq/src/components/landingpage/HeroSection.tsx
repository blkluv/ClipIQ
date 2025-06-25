"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { Button } from '../ui/button';

export default function HeroSection(): React.ReactElement {
  const { user } = useUser();
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[70vh] pt-32 pb-16 px-4 md:px-0 w-full overflow-hidden bg-black">
      {/* Radial gradient background, now on black */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(35,33,54,0.5) 60%, #000 100%)',
      }} />
      {/* Faint grid lines */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-20" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="400" height="200" patternUnits="userSpaceOnUse">
            <path d="M 400 0 L 0 0 0 200" fill="none" stroke="#18181b" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className='max-w-8xl border border-gray-800 px-12 pt-12 mx-12 mt-4 pb-16'>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto text-6xl md:text-7xl font-bold mb-4 text-gray-200 tracking-tight text-center flex items-center justify-content"
        >
          <span>ClipIQ</span><span className='text-4xl'>- Your All‑In‑One AI‑Powered Video Collaboration Suite</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="max-w-2xl mx-auto text-xl md:text-xl text-gray-400 mb-2 text-center"
        >
          Capture, Collaborate, Create—Effortlessly. Record Smarter. Share Faster.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 mb-10 text-center"
        >
          “Seamless Recording Meets Intelligent Collaboration.”
        </motion.p>
        </div>
        <div className='border border-gray-800 md:px-114 md:pb-14 md:pt-0'>
        <Button
          className="bg-[#7c3aed] text-white px-24 py-8 font-semibold text-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 hover:bg-purple-600 hover:shadow-xl"
          onClick={() => {
            if (!user) {
              window.location.href = '/auth/sign-in';
            } else {
              window.location.href = '/auth/callback';
            }
          }}
        >
         { user ? `Dashboard` : 'Get Started' }
        </Button>
        </div>
      </div>
    </section>
  );
} 