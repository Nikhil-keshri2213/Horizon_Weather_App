import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import SplashScreen from './pages/SplashScreen'

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <Dashboard />
      )}
    </>
  )
}

export default App;