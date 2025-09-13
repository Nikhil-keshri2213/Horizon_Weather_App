import React from 'react';

const ThreeDaysForecast = ({ forecastData = [] }) => {
  const formatDay = (dateString, index) => {
    if (index === 0) return 'Today';
    if (index === 1) return 'Tomorrow';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div className="rounded-xl p-4 h-full min-w-fit" 
    style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: "24px",
        padding: "25px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}>

      <h4 className="text-lg mb-4">3-Day Forecast</h4>

      {forecastData.length > 0 ? (
        
        <div className="space-y-10" 
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            borderRadius: "24px",
            padding: "25px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)"
            }}>

          {forecastData.map((day, index) => (
            <div key={index} className="flex items-center justify-between min-w-fit">
              
              <div className="flex items-center space-x-2 min-w-fit">
                <span className="text-sm font-medium">{formatDay(day.date, index)}</span>
              </div>
              
              <div className="flex items-center space-x-2 min-w-fit">
                {day.day?.condition?.icon ? (
                  <img 
                    src={day.day.condition.icon} 
                    alt={day.day.condition.text}
                    className="w-6 h-6"
                  />
                ) : (
                  <span className="text-lg">None</span>
                )}
                <span className="text-base font-semibold">{Math.round(day.day.maxtemp_c)}°C
                <span className="text-base text-gray-400">/</span>
                <span className="text-base text-gray-300">{Math.round(day.day.mintemp_c)}°C</span></span>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-40 space-y-4">
            <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full" />
            <p className="text-gray-400 font-medium">Loading forecast...</p>
          </div>
      )}

    </div>
  );
};

export default ThreeDaysForecast;