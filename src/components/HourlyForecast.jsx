import React from 'react';
import '../styles/HourlyForecast.css'; // import CSS file for scrollbar styles

const HourlyForecast = ({ hourlyData = [] }) => {
  const getCurrentHourIndex = () => {
    const now = new Date();
    return now.getHours();
  };

  const getAllHours = () => {
    if (!hourlyData || hourlyData.length === 0) return [];
    
    const currentHour = getCurrentHourIndex();
    const allHours = [];
    
    for (let i = 0; i < 24; i++) {
      const hourIndex = (currentHour + i) % 24;
      if (hourlyData[hourIndex]) {
        allHours.push({ ...hourlyData[hourIndex], isCurrentHour: i === 0 });
      }
    }
    return allHours;
  };

  const formatTimeDisplay = (timeString, isCurrentHour) => {
    if (isCurrentHour) return "Now";
    const timePart = timeString.split(' ')[1];
    const [hourNum] = timePart.split(':');
    const hour12 = new Date(`2000-01-01 ${hourNum}:00`);
    return hour12.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      hour12: true 
    });
  };

  const allHours = getAllHours();

  return (
    <div 
      className="rounded-3xl h-full relative overflow-hidden" 
      style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          borderRadius: "24px",
          padding: "25px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg text-white flex items-center gap-2">
            24-Hour Forecast
          </h4>
          <div className="text-xs text-gray-400 bg-white/10 px-3 py-1 rounded-full">
            Next 24hrs
          </div>
        </div>
        
        {allHours.length > 0 ? (
          <div className="hourly-scroll overflow-x-auto pb-4">
            <div className="flex gap-3 min-w-max">
              {allHours.map((hour, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center flex-shrink-0 relative group transition-all duration-300"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(15px)",
                    borderRadius: "20px",
                    padding: "18px 14px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    width: "90px",
                    height: "210px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
                  }}>

                  <span className={`text-xs mb-3 font-medium ${
                    hour.isCurrentHour ? 'text-white' : 'text-gray-300'}`}>
                    {formatTimeDisplay(hour.time, hour.isCurrentHour)}
                  </span>
                  
                  <div className="mb-3 relative">
                    {hour.condition?.icon ? (
                      <img 
                        src={hour.condition.icon} 
                        alt={hour.condition.text}
                        className="w-12 h-12 drop-shadow-lg"/>
                    ) : (
                      <span className="text-3xl drop-shadow-lg">☀️</span>
                    )}
                  </div>
                  
                  <span className="text-lg font-bold mb-2 text-white drop-shadow-sm">
                    {Math.round(hour.temp_c)}°C
                  </span>
                  
                  <span className="text-xs text-gray-300 text-center leading-tight mb-3 font-medium">
                    {hour.condition?.text || "Clear"}
                  </span>
                  
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 space-y-4">
            <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full" />
            <p className="text-gray-400 font-medium">Loading hourly forecast...</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default HourlyForecast;
