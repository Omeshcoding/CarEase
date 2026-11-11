import CategoryComponent from '@/components/CategoryComponent';
import FilterSidebar from '@/components/FilterSidebar';
import { connect } from '@/dbconfig/dbconfig';
import Car from '@/models/car';

export const revalidate = 0;

const getTopThreeCars = async (category) => {
  const cars = await Car.find({ category: category })
    .sort({ createdAt: -1 })
    .limit(3);
  return JSON.parse(JSON.stringify(cars));
};

const page = async () => {
  await connect();

  const popularCars = await getTopThreeCars('popular');
  const superCars = await getTopThreeCars('supercars');
  const upcomingCars = await getTopThreeCars('upcoming');
  const hatchbackCars = await getTopThreeCars('hatchback');

  return (
    <div className="bg-black text-white min-h-screen">
      {/* HERO SECTION */}
      <div className="relative bg-carlist-hero w-full h-[648px] bg-cover bg-center">
        {/* Dark Gradient Overlay to blend seamlessly into the black body */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black"></div>

        <div className="absolute inset-0 flex mt-32  mx-auto text-center px-4 sm:px-8 lg:px-16 w-full">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[100px] text-white font-black italic tracking-tighter uppercase leading-none drop-shadow-2xl">
            Explore
            <span className="text-[#E11D48] ml-4">Models</span>
          </h2>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex relative max-w-[1400px] mx-auto pb-32">
        {/* STICKY HUD SIDEBAR (Hidden on mobile, visible on medium+) */}
        <div className="w-[20%] h-full top-32 sticky mt-20 md:block hidden shrink-0 z-20">
          <FilterSidebar />
        </div>

        {/* CATEGORY SHOWROOM */}
        <div className="w-full md:w-[80%] flex flex-col gap-10 mt-10 md:mt-0 relative z-10">
          <section id="superCars" className="scroll-mt-32">
            <CategoryComponent
              carData={superCars}
              desc="Unleash the thrill of the road and track. Cutting-edge performance and unrivalled engagement in every drive"
            />
          </section>

          <section id="popularCars" className="scroll-mt-32">
            <CategoryComponent
              carData={popularCars}
              desc="Discover our top cars, blending style with outstanding performance for an incredible driving experience that sets new standards in automotive excellence."
            />
          </section>

          <section id="upcomingCars" className="scroll-mt-32">
            <CategoryComponent
              carData={upcomingCars}
              desc="Unveiling the Future of Driving Excellence. Your Next Dream Car Awaits!"
            />
          </section>

          <section id="hatchbackCars" className="scroll-mt-32">
            <CategoryComponent
              carData={hatchbackCars}
              desc="Explore our cars, seamlessly merging exquisite style with unparalleled performance, delivering an extraordinary driving experience that redefines the benchmarks in automotive excellence."
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default page;
