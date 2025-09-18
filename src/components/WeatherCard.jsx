import { WiDayCloudy } from "react-icons/wi";
import { MdLocationOn, MdDateRange } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function WeatherCard({ 
  icon, 
  temp, 
  cond, 
  city, 
  country, 
  date, 
  onSearch, 
  onLocationRequest 
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
      setSearchQuery("");
    }
  };

  const handleLocationClick = () => {
    if (onLocationRequest) onLocationRequest();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch(e);
  };

  return (
    <div
      className="flex flex-col shadow-2xl w-full max-w-sm sm:max-w-md mx-auto shrink-0"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: "24px",
        padding: "20px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)"
      }}>

      <div className="relative flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 min-w-10 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-xl px-3 py-2 text-white text-sm placeholder:text-white/50 focus:outline-none"/>
        
        <button
          onClick={handleSearch}
          className="shrink-0 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-xl px-3 py-2 text-white flex items-center justify-center hover:bg-[rgba(255,255,255,0.2)] transition-colors">
          <FaSearch size={16} />
        </button>
        
        <button
          onClick={handleLocationClick}
          className="shrink-0 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-xl px-3 py-2 text-white flex items-center justify-center hover:bg-[rgba(255,255,255,0.2)] transition-colors">
          <MdLocationOn size={16} />
        </button>
      </div>

      <div className="text-center">
        {icon ? (
          <img
            src={icon}
            alt={cond}
            className="w-24 h-24 sm:w-28 sm:h-28 mx-auto"/>
        ) : (
          <WiDayCloudy
            className="text-yellow-300 mx-auto mb-2"
            size={80}/>
        )}

        <div className="text-4xl sm:text-5xl font-semibold text-white">
          {temp || "--"}
        </div>

        <div className="text-lg sm:text-xl font-light text-white mb-3 mt-1">
          {cond || "No data"}
        </div>

        <hr className="border-white/30" />

        <div className="text-sm sm:text-md text-white mb-1 mt-3 flex items-center justify-center gap-1">
          <MdLocationOn size={16} /> {city || "Unknown"},{" "}
          {country || "Unknown"}
        </div>

        <div className="text-sm sm:text-md text-white flex items-center justify-center gap-1">
          <MdDateRange size={16} />{" "}
          {date || new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
