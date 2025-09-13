import React from 'react';

const SunriseSunset = ({sunrise, sunset}) => {
  return (
    <div className="bg-gray-700 rounded-xl p-4" style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: "24px",
        padding: "25px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)"
      }}>
      <h4 className="text-[16px] mb-2">Sunrise : Sunset</h4>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-semibold">Sunrise</span>
          <span className="text-sm font-semibold">{sunrise}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-semibold">Sunset</span>
          <span className="text-sm font-semibold">{sunset}</span>
        </div>
      </div>
    </div>
  );
};

export default SunriseSunset;