"use client"
import React from 'react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const features: Feature[] = [
  {
    // Mail icon
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#232228"/><path d="M12 16.5V24a2 2 0 002 2h12a2 2 0 002-2v-7.5a2 2 0 00-2-2H14a2 2 0 00-2 2z" stroke="#fff" strokeWidth="2"/><path d="M12 16.5l8 5 8-5" stroke="#fff" strokeWidth="2"/></svg>
    ),
    title: 'Workspace Management',
    desc: 'Create and switch between personal and team workspaces.',
  },
  {
    // Bolt icon
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#232228"/><path d="M22 10l-7 10h5l-2 6 7-10h-5l2-6z" fill="#fff"/></svg>
    ),
    title: 'Screen & Webcam Recording',
    desc: 'Record system audio, mic input, and webcam in one go.',
  },
  {
    // Bar chart icon
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#232228"/><rect x="13" y="22" width="3" height="6" rx="1.5" fill="#fff"/><rect x="18.5" y="16" width="3" height="12" rx="1.5" fill="#fff"/><rect x="24" y="19" width="3" height="9" rx="1.5" fill="#fff"/></svg>
    ),
    title: ' AI Enhancements',
    desc: 'Get a full text transcript of every recording, searchable in seconds.',
  },
  {
    // Smiley icon
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#232228"/><circle cx="15" cy="17" r="2" fill="#fff"/><circle cx="25" cy="17" r="2" fill="#fff"/><path d="M15 25c1.333 1.333 4.667 1.333 6 0" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    title: 'Interactive Collaboration',
    desc: 'Comment, reply, and react directly on the video timeline.',
  },
];

export default function ComprehensiveFeatureSection(): React.ReactElement {
  return (
    <section className="w-full bg-black pb-20">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Purple header bar */}
        <div className="bg-[#2d174c] py-8 px-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">We've Built the Future of Video Sharing</h2>
            <div className="text-gray-300 text-lg">Contact our team for a demo</div>
          </div>
          <div className="flex gap-3 mt-6 md:mt-0">
            <button className="bg-[#7c3aed] text-white font-semibold px-6 py-2 rounded-lg text-base shadow transition">Set Up a Time</button>
            <button className="bg-white hover:bg-gray-200 text-[#2d174c] font-semibold px-6 py-2 rounded-lg text-base shadow transition">Learn More</button>
          </div>
        </div>
        {/* Main content */}
        <div className="w-full flex flex-col md:flex-row gap-12 mt-16">
          {/* Left column */}
          <div className="flex-1 flex flex-col justify-start">
            <span className="px-4 py-1 rounded-full bg-[#232228] text-gray-400 text-xs font-semibold mb-4 w-fit">Built for Scale</span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Video Recording ,Sharing & Collaboration </h3>
            <div className="text-gray-400 text-base md:text-lg max-w-md">Seamlessly and easy to use.</div>
          </div>
          {/* Right column: feature cards */}
          <div className="flex-1 flex flex-col gap-6">
            {features.map((f, i) => (
              <div key={f.title} className="flex items-start gap-4 bg-[#232228] rounded-xl px-6 py-5 shadow border border-[#232136]">
                <div className="flex-shrink-0 mt-1">{f.icon}</div>
                <div>
                  <div className="font-semibold text-white text-base md:text-lg mb-1">{f.title}</div>
                  <div className="text-gray-400 text-sm md:text-base leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 