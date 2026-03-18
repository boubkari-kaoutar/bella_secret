import Hero from "@/components/sections/Hero";
import WhyBella from "@/components/sections/WhyBella";
import BestSellers from "@/components/sections/BestSellers";
import StoryPreview from "@/components/sections/StoryPreview";
import Testimonials from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyBella />
      <BestSellers />
      <StoryPreview />
      <Testimonials />
    </>
  );
}
