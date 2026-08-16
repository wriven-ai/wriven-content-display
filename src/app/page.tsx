// src/app/page.tsx
// Landing: static brand sections. Live CMS content starts at /blog, /products,
// /team, /case-studies, /jobs, /testimonials.

import { Hero } from '@/components/home/Hero';
import { Marquee } from '@/components/home/Marquee';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Features } from '@/components/home/Features';
import { CodeSample } from '@/components/home/CodeSample';
import CtaBand from '@/components/home/CtaBand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <HowItWorks />
      <Features />
      <CodeSample />
      <CtaBand />
    </>
  );
}
