"use client"
import { useState, useEffect } from 'react';
import { fetchWeatherByCoords } from './fetchWeather';
import WorldMapBg from './components/world-map-bg';
import Navbar from './components/navbar';
import { getWeatherEmoji } from './utils/weatherEmoji';

const Home = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [permissionChecked, setPermissionChecked] = useState(false);
  const [hasAutoLocation, setHasAutoLocation] = useState(false);

  // On mount, check if geolocation permission is already granted
  useEffect(() => {
    if (!navigator.geolocation) {
      setPermissionChecked(true);
      return;
    }

    navigator.permissions?.query({ name: "geolocation" })
      .then((result) => {
        if (result.state === "granted") {
          setLoading(true);
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation({ lat: latitude, lng: longitude });
              setHasAutoLocation(true);
              try {
                const data = await fetchWeatherByCoords(latitude, longitude);
                setWeather(data);
              } catch (err) {
                console.error("Error fetching location weather:", err);
              } finally {
                setLoading(false);
                setPermissionChecked(true);
              }
            },
            () => {
              setLoading(false);
              setPermissionChecked(true);
            }
          );
        } else {
          setPermissionChecked(true);
        }
      })
      .catch(() => {
        setPermissionChecked(true);
      });
  }, []);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    setUserLocation(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setHasAutoLocation(true);
        try {
          const data = await fetchWeatherByCoords(latitude, longitude);
          setWeather(data);
        } catch (err) {
          console.error("Error fetching location weather:", err);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
        console.error("Geolocation error:", error.message);
      }
    );
  };

  const showButton = permissionChecked && !hasAutoLocation;

  return (
    <main className='relative z-20 min-h-screen'>
      <WorldMapBg
        userLocation={userLocation}
        isSearching={loading && !userLocation}
      />
      <Navbar />
      <h1 className='text-3xl font-bold text-center mt-10'>Weather App</h1>

      {/* Only show button if permission wasn't auto-granted */}
      {showButton && (
        <div className='text-center mt-8'>
          <button
            onClick={handleGetLocation}
            disabled={loading}
            className='
              px-6 py-3 rounded-xl font-semibold
              bg-white/10 dark:bg-white/5 backdrop-blur-md
              border border-white/20 dark:border-white/10
              hover:scale-[1.03] hover:shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300 cursor-pointer
            '
          >
            {loading ? 'Getting Location...' : '📍 Get Current Location Weather'}
          </button>
        </div>
      )}

      {/* Loading spinner */}
      {loading && (
        <div className='text-center mt-10'>
          <div className='inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin opacity-50' />
          <p className='mt-3 opacity-50'>Fetching weather...</p>
        </div>
      )}

      {/* Weather card */}
      {weather && !loading && (
        <div className='w-[90%] max-w-md mx-auto mt-8'>
          <div className='
            relative overflow-hidden rounded-2xl p-6
            bg-white/10 dark:bg-white/5
            backdrop-blur-md
            border border-white/20 dark:border-white/10
            text-center
          '>
            {/* City header */}
            <div className='flex items-center justify-center gap-3 mb-4'>
              <span className='text-4xl'>{getWeatherEmoji(weather.weather[0].main)}</span>
              <div>
                <h2 className='text-2xl font-bold'>{weather.name}</h2>
                {weather.sys?.country && (
                  <p className='text-xs opacity-50'>{weather.sys.country}</p>
                )}
              </div>
            </div>

            {/* Temperature */}
            <div className='text-5xl font-bold mb-1'>{Math.round(weather.main.temp)}°C</div>
            <p className='text-sm capitalize opacity-70 mb-4'>{weather.weather[0].description}</p>

            {/* Details */}
            <div className='flex justify-center gap-6 text-xs opacity-60'>
              <span>Feels like <strong>{Math.round(weather.main.feels_like)}°C</strong></span>
              <span>Humidity <strong>{weather.main.humidity}%</strong></span>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Home