import React from "react";

const WindStatus = ({ speed, unit, time }) => {
  return (
    <div
      className="bg-gray-700 rounded-xl p-4"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: "24px",
        padding: "25px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}>

      <h4 className="text-lg mb-2">Wind Status</h4>

      <div className="flex items-center space-x-1">
        <span className="text-2xl font-bold">{speed}</span>
        <span className="text-lg">{unit}</span>
      </div>
      
      <div className="mt-2">
        <div className="flex items-center">
          <span className="text-base">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default WindStatus;
