"use client"
import { useState } from 'react';
import fetchWeather from '../fetchWeather';
import WorldMapBg from '../components/world-map-bg';
import Navbar from '../components/navbar';
import { getWeatherEmoji } from '../utils/weatherEmoji';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const fetchWeatherData = async () => {
    if (!searchQuery.trim()) return;
    
    setFetching(true);
    setSearchedLocation(null);
    setError(null);
    setWeatherData(null);

    try {
      const data = await fetchWeather(searchQuery.trim());
      setWeatherData(data);
      if (data.coord) {
        setSearchedLocation({ lat: data.coord.lat, lng: data.coord.lon });
      }
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setFetching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchWeatherData();
    }
  };

  return (
    <main className='relative z-20 min-h-screen pb-12'>
      <WorldMapBg
        userLocation={searchedLocation}
        isSearching={false}
      />
      <Navbar />
      <h1 className='text-3xl font-bold text-center mt-10'>Search Weather</h1>
      <p className='text-center mt-2 opacity-60'>Enter a city name to get weather information</p>

      {/* Search Input Area */}
      <div className='flex gap-3 w-[90%] max-w-md mx-auto mt-8 relative z-10'>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Enter city name... (e.g. Paris)"
          className='
            flex-1 px-4 py-3 rounded-xl outline-none
            bg-white/10 dark:bg-white/5 backdrop-blur-md
            border border-white/20 dark:border-white/10
            placeholder:opacity-40
            focus:ring-2 ring-white/20 text-black dark:text-white
            transition-all duration-300
          '
        />
        <button
          onClick={fetchWeatherData}
          disabled={fetching || !searchQuery.trim()}
          className='
            px-6 py-3 rounded-xl font-semibold
            bg-white/10 dark:bg-white/5 backdrop-blur-md
            border border-white/20 dark:border-white/10
            hover:scale-[1.03] hover:shadow-lg
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-300 cursor-pointer text-black dark:text-white
          '
        >
          {fetching ? '...' : '🔍 Search'}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <p className='text-center mt-5 text-red-500 font-medium bg-red-100/10 py-2 px-4 rounded-lg inline-block mx-auto block w-fit'>{error}</p>
      )}

      {/* Loading spinner */}
      {fetching && (
        <div className='text-center mt-10'>
          <div className='inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin opacity-50' />
          <p className='mt-3 opacity-50'>Searching...</p>
        </div>
      )}

      {/* Weather result card */}
      {weatherData && !fetching && (
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
              <span className='text-4xl'>{getWeatherEmoji(weatherData.weather[0].main)}</span>
              <div>
                <h2 className='text-2xl font-bold'>{weatherData.name}</h2>
                {weatherData.sys?.country && (
                  <p className='text-xs opacity-50'>{weatherData.sys.country}</p>
                )}
              </div>
            </div>

            {/* Temperature */}
            <div className='text-5xl font-bold mb-1'>{Math.round(weatherData.main.temp)}°C</div>
            <p className='text-sm capitalize opacity-70 mb-4'>{weatherData.weather[0].description}</p>

            {/* Details */}
            <div className='flex justify-center gap-6 text-xs opacity-60'>
              <span>Feels like <strong>{Math.round(weatherData.main.feels_like)}°C</strong></span>
              <span>Humidity <strong>{weatherData.main.humidity}%</strong></span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}