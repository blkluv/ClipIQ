"use client"
import React from 'react';

interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: 'What does the Free plan include?',
    a: 'Up to 5 minutes per recording , Basic auto‑transcription (raw text),Private workspaces only (no public sharing).',
  },
  {
    q: 'How do I record my screen and webcam at the same time?',
    a: 'In the desktop app’s settings, select your screen source and your webcam under “Video Sources.” Hit Start Recording, and both feeds will merge into a single clip.',
  },
  {
    q: 'Can I reorganize folders after uploading videos?',
    a: 'Absolutely. Just double‑click any folder name to rename it, or drag & drop a video from one folder to another at any time.',
  },
  {
    q: 'What additional features do I get with Pro?',
    a: 'Unlimited recording length,AI‑powered smart titles, descriptions, and tagging,Ability to create public workspaces and invite collaborators,Ability to create public workspaces and invite collaborators, Priority processing & support.',
  },
  {
    q: 'Can I upgrade mid‑stream?',
    a: 'Yes—simply upgrade your plan in the web app. Your desktop client will immediately unlock Pro limits (you may need to restart recording if you hit the 5 min Free cap).',
  },
];

export default function FAQSection(): React.ReactElement {
  return (
    <section className="w-full bg-black py-20 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="mb-3 flex justify-center">
          <span className="px-4 py-1 rounded-full bg-[#232228] text-gray-400 text-xs font-semibold">FAQs</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white text-center">Frequently asked questions</h2>
        <div className="text-gray-400 text-base mb-12 text-center max-w-2xl mx-auto">Find answers to common questions about our solutions.</div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {faqs.map((faq, i) => (
            <div key={i} className="">
              <div className="font-semibold text-white text-base mb-2 leading-snug">{faq.q}</div>
              <div className="text-gray-400 text-sm leading-relaxed">{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 