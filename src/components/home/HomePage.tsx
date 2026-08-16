// src/components/home/HomePage.tsx
// The homepage is fully static — brand sections about Wriven, no dashboard
// dependency. Dynamic content (products, writing, people) lives on routed pages.

import { Hero } from '@/components/home/Hero';
import { Marquee } from '@/components/home/Marquee';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Features } from '@/components/home/Features';
import { CodeSample } from '@/components/home/CodeSample';
import CtaBand from '@/components/home/CtaBand';

export function HomePage() {
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
