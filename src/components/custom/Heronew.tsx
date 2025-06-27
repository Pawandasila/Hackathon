"use client";
import { ReactLenis } from "lenis/react";
import HeroSection from "./HeroSection";
import WhatWeDoSection from "./WhatWeDoSection";
import SustainabilityJourneySection from "./SustainabilityJourneySection";
import RewardsSection from "./RewardsSection";
import Footer from "./Footer";

export default function Index() {

  return (
    <ReactLenis root>
      <main>
        <div className="wrapper">
          <HeroSection />
          <WhatWeDoSection />
        </div>
        <div className="wrapper">
          <SustainabilityJourneySection />
          <RewardsSection />
        </div>
        <Footer />
      </main>
    </ReactLenis>
  );
}
