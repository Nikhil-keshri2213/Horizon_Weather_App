import React from 'react';

const Visibility = ({dist, unit, cond}) => {
  return (
    <div className="bg-gray-700 rounded-xl p-4" style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(3px)",
        borderRadius: "24px",
        padding: "25px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)"
      }}>

      <h4 className="text-[16px] mb-2">Visibility</h4>
      
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-semibold">{dist} {unit}</span>
      </div>

      <div className="mt-2">
        <span className="text-base text-green-400">{cond}</span>
      </div>
    </div>
  );
};

export default Visibility;