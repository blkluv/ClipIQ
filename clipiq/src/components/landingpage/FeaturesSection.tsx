"use client"
import React from 'react';
import { motion } from 'framer-motion';
import image1 from '../../../public/images/logo.jpeg';
import image2 from '../../../public/images/logo.jpeg';
import image3 from '../../../public/images/logo.jpeg';
import image4 from '../../../public/images/logo.jpeg';
import image5 from '../../../public/images/logo.jpeg';
import image6 from '../../../public/images/logo.jpeg';
import Image, { StaticImageData } from 'next/image';

interface Feature {
  title: string;
  desc: string;
  bullets: string[];
  image: StaticImageData;
}

const features: Feature[] = [
  {
    title: 'Workspace Management',
    desc: 'Create public and personal workspaces as per the need.',
    bullets: [
      'Multi‑Workspace Support: Create and switch between personal and team workspaces.',
      'Granular Permissions: Invite collaborators with view‑only or edit rights.',
      'Real‑Time Sync: New videos and comments appear instantly for all members.',
    ],
    image: image1,
  },
  {
    title: 'Folder Organization',
    desc: 'Oraginze your videos in folders.',
    bullets: [
      'Drag & Drop: Reorder folders and videos with a simple drag.',
      'Inline Rename: Double‑click any folder name to rename it on the spot.',
      'Nested Structures: Create subfolders to keep large projects neatly organized.',
    ],
    image: image2,
  },
  {
    title: 'Screen & Webcam Recording',
    desc: 'Seamless Screen and Webcam record throgh our desktop app.',
    bullets: [
      'HD/SD Quality: Auto‑select based on your plan, or choose manually.',
      'Audio & Camera Feeds: Record system audio, mic input, and webcam in one go.',
      'Instant Upload: Clips begin uploading mid‑record so you never lose footage.',
    ],
    image: image3,
  },
  {
    title: 'AI Enhancements',
    desc: 'Unleash AI feature for auto transciption , title and description.',
    bullets: [
      'Auto‑Transcription: Get a full text transcript of every recording, searchable in seconds.',
      'Smart Title & Description: Gemini‑powered generation of titles and summaries.',
      'Keyword Tagging: Automatic extraction of top topics and tags for easy filtering.',
    ],
    image: image4,
  },
  {
    title: 'Video Processing & Delivery',
    desc: 'Real time auto transfer of your video to your workspace as you are recording.',
    bullets: [
      'Chunked Uploads: WebSocket‑powered real‑time transfer of video segments.',
      'On‑Demand Transcoding: Convert .webm to MP4 or HLS for maximum compatibility.',
    ],
    image: image5,
  },
  {
    title: 'Interactive Collaboration',
    desc: 'Interact on video in activity panel through comments and replies.',
    bullets: [
      'Inline Comments: Comment, reply, and react directly on the video timeline.',
      'Version History: See and revert to previous edits of titles, descriptions, and tags.',
      'Notifications & Mentions: Stay in the loop when someone mentions you or replies.',
    ],
    image: image6,
  },
];

export default function FeaturesSection(): React.ReactElement {
  return (
    <section className="w-full bg-black py-12 flex flex-col items-center ">
      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col gap-8 md:gap-10">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex flex-col md:flex-row md:items-center bg-[#232228] rounded-2xl border border-[#232136] shadow-lg overflow-hidden p-0 md:p-2"
          >
            {/* On mobile, video first; on desktop, video left/right alternates */}
            <div className={`w-full md:w-1/2 flex items-center justify-center ${i % 2 === 1 ? 'md:order-2' : ''}`}>
              <Image
                src={feature.image}
                alt={`Screenshot of ${feature.title}`}
                className="w-full h-40 md:h-76 rounded-lg object-cover border border-[#232136] bg-black"
              />
            </div>
            <div className={`w-full md:w-1/2 flex flex-col justify-center py-8 px-4 md:p-8 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
              <h2 className="text-xl md:text-3xl font-bold mb-2 text-white leading-snug">{feature.title}</h2>
              <p className="text-gray-400 mb-4 text-sm md:text-lg leading-relaxed">{feature.desc}</p>
              <ul className="list-none space-y-4">
                {feature.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-3 text-gray-200 text-sm md:text-lg">
                    <span className="mt-2 text-gray-600">
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#232136"/><path d="M7 13l3 3 7-7" stroke="#808080" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 