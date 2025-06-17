"use client"
import { motion } from 'framer-motion';
import bg from '../../../public/images/bg-demo.png';

export default function DemoBanner() {
  return (
    <section className="w-full flex justify-center items-center relative bg-black px-4">
      <div className="w-full max-w-7xl mx-auto  relative">
      <div className="absolute inset-0 bg-cover bg-center blur-xs pointer-events-none" style={{ backgroundImage: `url(${bg})`  }} />
      <div className="relative py-12 z-10 flex flex-col items-center w-full h-full rounded-xl shadow-xl bg-black/30">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white text-center">Book a Demo</h2>
        <p className="text-gray-200 mb-6 text-center">See how ClipIQ can revolutionize video sharing.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg shadow-lg focus:outline-none focus:ring-2"
        >
          Schedule Now
        </motion.button>
      </div>
      </div>
    </section>
  );
} 