import React from 'react';

const SpecificationTab = ({ specifications, modelName }) => {
  if (!specifications) return null;

  // Convert the specifications object into an array so we can easily map over all of them
  const specsList = Object.entries(specifications);

  return (
    <div className="w-full lg:w-[350px] xl:w-[400px] h-auto lg:h-[350px] xl:h-[400px] bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl flex flex-col">
      <h3 className="text-white text-xl md:text-2xl font-semibold mb-6 border-b border-white/20 pb-2 tracking-wide uppercase shrink-0">
        {modelName ? `${modelName} ` : 'VEHICLE SPECIFICATIONS'}
      </h3>

      {/* 2 columns on mobile, 1 column on large screens */}
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 lg:overflow-y-auto lg:max-h-[240px] xl:max-h-[290px] pr-2 custom-scrollbar flex-1">
        {specsList.map(([key, value], index) => {
          const formattedLabel = key.replace('_', ' ').toUpperCase();

          // Smart detection for Array-like values (handles actual arrays, JSON strings, or comma-separated strings)
          let isList = false;
          let listValues = [];

          if (Array.isArray(value)) {
            isList = true;
            listValues = value;
          } else if (typeof value === 'string') {
            try {
              // Check if it's a JSON array string like '["Feature 1", "Feature 2"]'
              const parsed = JSON.parse(value);
              if (Array.isArray(parsed)) {
                isList = true;
                listValues = parsed;
              }
            } catch (e) {
              // Not valid JSON, fallback to comma separation check
            }

            if (!isList && value.includes(',')) {
              // Ignore numbers with commas like "1,200"
              const isNumberWithComma = /^[0-9]+,[0-9]+$/.test(value.trim());
              if (!isNumberWithComma) {
                isList = true;
                listValues = value
                  .split(',')
                  .map((v) => v.trim())
                  .filter(Boolean);
              }
            }
          }

          return (
            <div
              key={index}
              className="flex justify-between items-center group cursor-pointer transition-all duration-300 ease-in-out border-b border-transparent hover:border-white/10 pb-2"
            >
              <div className="flex flex-col w-[85%]">
                <span className="text-gray-400 text-[10px] md:text-xs tracking-[0.2em] font-medium mb-1 transition-colors group-hover:text-white">
                  {formattedLabel}
                </span>

                {isList ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {listValues.map((item, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white/10 border border-white/5 rounded-md text-[10px] md:text-xs text-gray-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-white text-sm md:text-md font-semibold truncate hover:text-clip hover:whitespace-normal">
                    {value}
                  </span>
                )}
              </div>

              {/* Video Game Hover Arrow (Pointing Left at the Value) */}
              <div className="w-[15%] flex justify-end opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <svg
                  className="w-5 h-5 text-white/50 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpecificationTab;
