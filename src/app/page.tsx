// src/app/page.tsx
// Landing: static brand sections + live proof. The LatestWriting and LiveStats
// blocks fetch from the Delivery API at render time — the homepage itself
// demonstrates the product.

import { Hero } from '@/components/home/Hero';
import { Marquee } from '@/components/home/Marquee';
import { LiveStats } from '@/components/home/LiveStats';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Features } from '@/components/home/Features';
import { CodeSample } from '@/components/home/CodeSample';
import { LatestWriting } from '@/components/home/LatestWriting';
import { PublishLoop } from '@/components/home/PublishLoop';
import CtaBand from '@/components/home/CtaBand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <LiveStats />
      <HowItWorks />
      <LatestWriting />
      <Features />
      <CodeSample />
      <PublishLoop />
      <CtaBand />
    </>
  );
}
