import React from 'react';

const FeelsLike = ({temp, cond}) => {
  return (
    <div className="rounded-xl p-4" style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(3px)",
        borderRadius: "24px",
        padding: "25px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)"
      }}>
      <h4 className="text-[16px] mb-2">Feels Like</h4>
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-semibold">{temp} ℃</span>
      </div>
      <div className="mt-2">
        <span className="text-base text-yellow-400">{cond}</span>
      </div>
    </div>
  );
};

export default FeelsLike;