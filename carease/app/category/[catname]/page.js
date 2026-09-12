'use client';

import Card from '@/components/Card';
import axios from 'axios';
import { useEffect, useState } from 'react';

const CategoryName = ({ params }) => {
  const [carsByCategory, setCarsByCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCarsData = async () => {
    try {
      const carsData = await axios.get(
        `/api/getCarByCategory/${params.catname}`,
      );
      setCarsByCategory(carsData.data);
    } catch (error) {
      console.error('Failed to fetch category data', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCarsData();
  }, [params.catname]);

  return (
    <div className="bg-black text-white min-h-screen pb-32">
      {/* HERO SECTION */}
      <div className="relative bg-carlist-hero w-full h-[400px] md:h-[500px] bg-cover bg-center">
        {/* Dark Gradient Overlay to blend seamlessly into the black body */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black"></div>

        <div className="absolute inset-0 flex flex-col justify-center pt-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] text-white font-black italic tracking-tighter uppercase leading-none drop-shadow-2xl">
            {params.catname} <br />
            <span className="text-[#E11D48]">Models</span>
          </h2>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 mt-12">
        {isLoading ? (
          <div className="w-full flex justify-center py-20">
            <div className="animate-pulse text-[#E11D48] font-bold tracking-widest uppercase">
              Loading Garage...
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-16 xl:gap-20 flex-wrap h-auto">
            {carsByCategory.length > 0 ? (
              carsByCategory.map((car) => {
                return (
                  <Card
                    key={car._id}
                    tag={car.category}
                    imageUrl={car.imageUrl}
                    model={car.model}
                    carId={car._id}
                  />
                );
              })
            ) : (
              <div className="w-full py-20 text-white/50 tracking-widest uppercase">
                No vehicles found in this category.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryName;
