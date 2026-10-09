import OurBusiness from "./OurBusiness";

const About = () => {
  return (
    <div id="about" className="w-full max-w-7xl mx-auto px-4 sm:px-8 mt-16 scroll-mt-28">
      <section className="flex flex-col text-center py-6">
        <h2 className="text-3xl sm:text-5xl font-black italic tracking-tight uppercase text-neutral-900">
          <span className="text-[#E11D48]">Who</span> We Are
        </h2>
        <p className="text-neutral-600 font-medium max-w-3xl mx-auto text-base sm:text-lg leading-relaxed mt-4">
          CarEase is your premier automotive destination for comparing vehicles with precision and clarity. We provide a high-performance showroom platform where you can effortlessly explore specs, analyze head-to-head diagnostics, and discover the perfect drive tailored to your lifestyle.
        </p>
      </section>
      <OurBusiness />
    </div>
  );
};

export default About;