import React from "react";

export const TitleBar = () => {
  return (
    <header
    className="w-full max-w-6xl mx-auto px-2"
    style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(3px)",
        borderRadius: "0px 0px 20px 20px",
        padding: "10px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
    }}>
  <p className="text-xl sm:text-xl md:text-2xl lg:text-3xl text-white text-center tracking-[0.3em] uppercase font-extralight">
    <span className="font-thin">--</span>
    <span className="font-black drop-shadow-lg">H</span>
    <span className="font-thin">ORI</span>
    <span className="font-black  drop-shadow-lg">Z</span>
    <span className="font-thin">ON</span>
    <span className="font-thin">--</span>
  </p>
</header>

  );
};