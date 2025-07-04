import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";
import NoInternetScreen from "./NoInternetScreen";
import "./App.css";

const SPLASH_DURATION = 2000; // 2 seconds

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleRetry = () => {
    if (window.navigator.onLine) {
      setIsOnline(true);
    }
  };

  if (showSplash) return <SplashScreen />;
  if (!isOnline) return <NoInternetScreen onRetry={handleRetry} />;

  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
    </div>
  );
};

export default App;
