import React from 'react';

const ComparisonTable = ({ carA, carB, parseSpec }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 mt-8 lg:mt-16 relative z-20">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl p-4 lg:p-12">
        <h3 className="text-sm lg:text-xl text-center text-[#E11D48] uppercase tracking-widest mb-6 lg:mb-10 font-bold border-b border-white/10 pb-4">
          Head-to-Head Diagnostics
        </h3>

        <div className="flex flex-col gap-2 lg:gap-4">
          <SpecRow
            label="Engine"
            valA={carA?.specifications?.engine}
            valB={carB?.specifications?.engine}
          />
          <SpecRow
            label="Drive Train"
            valA={carA?.specifications?.drivetrain}
            valB={carB?.specifications?.drivetrain}
          />
          <SpecRow
            label="Transmission"
            valA={carA?.specifications?.transmission}
            valB={carB?.specifications?.transmission}
          />
          <SpecRow
            label="Fuel Type"
            valA={carA?.specifications?.fuel_type}
            valB={carB?.specifications?.fuel_type}
          />
          {/* MPG highlights the higher number automatically with NEON GREEN */}
          <SpecRow
            label="MPG"
            valA={carA?.specifications?.mpg}
            valB={carB?.specifications?.mpg}
            highlightBest
          />
          <SpecRow
            label="Exterior Color"
            valA={carA?.specifications?.exterior_color}
            valB={carB?.specifications?.exterior_color}
          />
          <SpecRow
            label="Interior Color"
            valA={carA?.specifications?.interior_color}
            valB={carB?.specifications?.interior_color}
          />

          {/* Hidden JSON Arrays properly parsed */}
          <SpecRow
            label="Exterior Features"
            valA={parseSpec(carA?.specifications?.exterior)}
            valB={parseSpec(carB?.specifications?.exterior)}
            isLong
          />
          <SpecRow
            label="Convenience"
            valA={parseSpec(carA?.specifications?.convenience)}
            valB={parseSpec(carB?.specifications?.convenience)}
            isLong
          />
        </div>
      </div>
    </div>
  );
};

// Internal component for perfectly aligning rows
const SpecRow = ({
  label,
  valA,
  valB,
  highlightBest = false,
  isLong = false,
}) => {
  let better = null;
  if (highlightBest && valA && valB) {
    const numA = parseFloat(valA.toString().match(/\d+/)?.[0] || 0);
    const numB = parseFloat(valB.toString().match(/\d+/)?.[0] || 0);
    if (numA > numB) better = 'A';
    if (numB > numA) better = 'B';
  }

  // Neon Green Glowing class for the winner
  const winnerStyle =
    'text-[#39ff14] drop-shadow-[0_0_8px_rgba(57,255,20,0.8)] text-sm lg:text-xl font-bold';
  const normalStyle = 'text-white/80';

  return (
    <div
      className={`flex flex-row justify-between items-center py-3 lg:py-4 border-b border-white/5 hover:bg-white/10 transition-colors rounded-lg px-2 lg:px-4 gap-2 lg:gap-4 ${
        isLong ? 'items-start' : 'items-center'
      }`}
    >
      {/* Car A Value */}
      <div
        className={`w-[40%] text-right font-medium leading-relaxed ${
          better === 'A' ? winnerStyle : normalStyle
        } ${isLong ? 'text-[10px] lg:text-sm' : 'text-xs lg:text-md'}`}
      >
        {valA || 'N/A'}
      </div>

      {/* Center Label */}
      <div className="w-[20%] text-center font-bold text-[#E11D48] uppercase text-[8px] lg:text-xs tracking-[0.1em] lg:tracking-[0.2em] flex items-center justify-center">
        {label}
      </div>

      {/* Car B Value */}
      <div
        className={`w-[40%] text-left font-medium leading-relaxed ${
          better === 'B' ? winnerStyle : normalStyle
        } ${isLong ? 'text-[10px] lg:text-sm' : 'text-xs lg:text-md'}`}
      >
        {valB || 'N/A'}
      </div>
    </div>
  );
};

export default ComparisonTable;
