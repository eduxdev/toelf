import { HeroSection } from "@/components/home/hero-section";
import { SectionsGrid } from "@/components/home/sections-grid";
import { FeaturesStrip } from "@/components/home/features-strip";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesStrip />
      <SectionsGrid />
    </>
  );
}
