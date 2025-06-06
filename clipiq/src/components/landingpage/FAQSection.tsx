"use client"
import React from 'react';

interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: 'Are these solutions applicable to me if I am operating a co-location?',
    a: 'Yes! Our solutions are designed to help co-location operators manage their infrastructure more efficiently and effectively.',
  },
  {
    q: 'How do you ensure data privacy and security?',
    a: 'We adhere to strict data privacy regulations and implement robust security measures to protect sensitive information.',
  },
  {
    q: 'How does pricing work?',
    a: 'Depending on your requirements, we offer flexible pricing models.',
  },
  {
    q: 'Do you provide ongoing support and maintenance for your solutions?',
    a: 'Absolutely - we offer comprehensive support and maintenance as well as customization for your needs.',
  },
  {
    q: 'How do I get started?',
    a: 'Set up a demo and we\'ll guide you through our offerings and start a trial!',
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