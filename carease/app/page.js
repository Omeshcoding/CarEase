import Hero from '@/components/Hero';
import VideoCarousels from '@/components/VideoCarousels';

import About from '@/components/About';
import FeaturedComparison from '@/components/FeaturedComparison';
import PopularBrands from '@/components/PopularBrands';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <PopularBrands />
      <FeaturedComparison />
      <section className="relative w-full h-[460px] sm:h-[540px] lg:h-[640px] bg-black overflow-hidden border-t border-b border-white/5">
        <VideoCarousels />
      </section>
      <Footer />
    </main>
  );
}
