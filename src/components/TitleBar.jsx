import React from "react";

export const TitleBar = () => {
  return (
    <header
    className="w-full max-w-6xl mx-auto px-2"
    style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        padding: "16px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
    }}>
  <p className="text-xl sm:text-xl md:text-2xl lg:text-3xl text-white text-center tracking-wide">
    <span className="font-bold">H</span>ORI<span className="font-bold">Z</span>ON
  </p>
</header>

  );
};
