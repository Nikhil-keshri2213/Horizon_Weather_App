import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const WeatherMap = ({ latitude, longitude, city = "Unknown Location", onLocationRequest }) => {
  const defaultPosition = [28.6139, 77.2090];
  const position = (latitude && longitude) 
    ? [parseFloat(latitude), parseFloat(longitude)]
    : defaultPosition;

  const handleLocationClick = () => {
    if (onLocationRequest) {
      onLocationRequest();
    }
  };

  const isUsingDefault = !latitude || !longitude;

  return (
    <div className="rounded-xl p-10 h-[750px]" style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: "24px",
        padding: "25px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}>

      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg">Weather Map</h4>
        
        {isUsingDefault && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-yellow-400">Showing default location</span>
            <button 
              onClick={handleLocationClick}
              className="text-sm bg-blue-500/20 hover:bg-blue-500/40 border border-blue-500/50 rounded-lg px-3 py-1 transition-colors">
              Get My Location
            </button>
          </div>
        )}
      </div>
      
      <div className="w-full h-[650px] rounded-xl overflow-hidden">
        <MapContainer 
          center={position} 
          zoom={10} 
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
          className="rounded-xl"
          key={`${position[0]}-${position[1]}`}>
          
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          
          <Marker position={position}>
            <Popup>
              {isUsingDefault ? (
                <>
                  Default Location<br />
                  <small>Click "Get My Location" to show your weather location</small>
                </>
              ) : (
                <>
                  {city} Weather Location<br />
                  Lat: {latitude}, Lng: {longitude}
                </>
              )}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      
      {isUsingDefault && (
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-sm text-yellow-200">
            <strong>Note:</strong> Location coordinates not available. Showing default location. 
            Use the location button to get weather for your current position.
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherMap;