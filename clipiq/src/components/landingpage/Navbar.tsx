"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../../public/images/logo.jpeg';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';

interface NavDropdown {
  label: string;
  items: string[];
}

const navDropdowns: NavDropdown[] = [
  {
    label: 'Data Center Infrastructure Management',
    items: [
      'Monitoring Devices',
      'Asset Tracking',
      'Network Management',
      'Change Management',
      'Colocation Management',
      'Data Center Planner',
      'Firmware Management',
      'IP Address Management',
      'Customer Portal',
      'Custom Insights',
      'Custom Data Center Solutions',
    ],
  },
  {
    label: 'Intelligence Solutions',
    items: [
      'Digital Twins',
      'Smart Power Mapping',
      'Predictive Failure and Alerting',
      'Smart Control Systems',
      'Automated Discovery',
    ],
  },
  {
    label: 'Data Center Compliance',
    items: [
      'DCOI Compliance',
      '(EU) 2023/1791',
      'EN 50600',
      'LEED Certification',
      'ISO/IEC 30134-2',
      '(EPA) ENERGY STAR',
      'European Commission JRC',
    ],
  },
  {
    label: 'Sustainability Blog',
    items: [
      'Energy Efficiency',
      'Stranded Energy Map',
      'Environmental Product Declaration',
      'Renewables Integration',
      'Power Resource Management',
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const handleEnter = (i: number) => setOpenIndex(i);
  const handleLeave = () => setOpenIndex(null);

  return (
    <nav className="w-full flex items-center justify-between px-4 md:px-8 py-4 bg-black/70 backdrop-blur fixed top-0 left-0 z-50" aria-label="Main navigation">
      <div className="flex items-center gap-2">
        {/* Placeholder logo */}
         <UserButton/>
        <Image src={logo} alt="CentralAxis Logo" className="h-8 w-8" />
        <span className="text-2xl font-bold ml-2">CentralAxis</span>
      </div>
       <UserButton/>
      <div className="hidden md:flex gap-8 text-base font-medium relative">
        {navDropdowns.map((nav, i) => (
          <div
            key={nav.label}
            className="relative group cursor-pointer"
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={handleLeave}
          >
            <span className="flex items-center gap-1 hover:text-purple-300 transition">{nav.label} <span>▼</span></span>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.18 }}
                  className="absolute  left-1/2 -translate-x-1/2 mt-2 w-72 bg-[#18181b] border border-amber-50 rounded-xl shadow-xl py-2 z-50"
                >
                  {nav.items.map((item) => (
                    <div
                      key={item}
                      className="px-6 py-3 text-white hover:bg-[#232136] hover:text-purple-300 transition text-base cursor-pointer text-left"
                    >
                      {item}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
           
          </div>
        ))}
      </div>
      {/* Hamburger for mobile */}
      <button className="md:hidden flex items-center" onClick={() => setOpen(!open)} aria-label="Open menu">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            className="fixed top-0 right-0 w-2/3 h-full bg-[#18181b] flex flex-col gap-6 p-8 z-50 md:hidden"
          >
            <button className="self-end" onClick={() => setOpen(false)} aria-label="Close menu">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" d="M6 6l12 12M6 18L18 6"/></svg>
            </button>
            {navDropdowns.map((nav, i) => (
              <div
                key={nav.label}
                className="relative group cursor-pointer"
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={handleLeave}
              >
                <span className="flex items-center gap-1 hover:text-purple-300 transition">{nav.label} <span>▼</span></span>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-[#18181b] border border-[#33334a] rounded-xl shadow-xl py-2 z-50"
                    >
                      {nav.items.map((item) => (
                        <div
                          key={item}
                          className="px-6 py-3 text-white hover:bg-[#232136] hover:text-purple-300 transition text-base cursor-pointer text-left"
                        >
                          {item}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 