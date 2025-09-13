import { useEffect, useState } from 'react';
import '../styles/SplashScreen.css';
// Import your logo image - place your logo in src/assets/
import logoImage from '../asset/logo/logo-horizon.png'; // Update this path to your logo

const SplashScreen = ({ onFinish }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => onFinish(), 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`splash-container ${!isLoading ? 'fade-out' : ''}`}>
      <div className="splash-content">
        {/* Logo Image */}
        <div className="logo-container">
          <img 
            src={logoImage} 
            alt="Horizon Weather App" 
            className="logo-image"
          />
        </div>
        
        {/* Loading indicator */}
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Getting weather data...</p>
          <p className="loading-text">@Developed By Nikhil Keshri</p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;