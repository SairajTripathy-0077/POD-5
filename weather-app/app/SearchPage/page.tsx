"use client"
import { useState } from 'react';
import fetchWeather from '../fetchWeather';
import WorldMapBg from '../components/world-map-bg';
import Navbar from '../components/navbar';
import { getWeatherEmoji } from '../utils/weatherEmoji';

const SearchPage = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [mapJumping, setMapJumping] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState<{ lat: number; lng: number } | null>(null);

  async function handleSearch(formData: FormData) {
    const city = formData.get("city") as string;
    if (!city.trim()) return;

    setFetching(true);
    setMapJumping(true);
    setSearchedLocation(null);
    setError(null);
    setWeatherData(null);

    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
      if (data.coord) {
        setSearchedLocation({ lat: data.coord.lat, lng: data.coord.lon });
      }
      setMapJumping(false);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setFetching(false);
    }
  }

  return (
    <main className='relative z-20 min-h-screen'>
      <WorldMapBg
        userLocation={searchedLocation}
        isSearching={mapJumping}
      />
      <Navbar />
      <h1 className='text-3xl font-bold text-center mt-10'>Search Weather</h1>
      <p className='text-center mt-2 opacity-60'>Enter a city name to get weather information</p>

      {/* Search form */}
      <form action={handleSearch} className='flex gap-3 w-[90%] max-w-md mx-auto mt-8'>
        <input
          name="city"
          type="text"
          placeholder="Enter city name..."
          className='
            flex-1 px-4 py-3 rounded-xl outline-none
            bg-white/10 dark:bg-white/5 backdrop-blur-md
            border border-white/20 dark:border-white/10
            placeholder:opacity-40
            focus:ring-2 ring-white/20
            transition-all duration-300
          '
        />
        <button
          type="submit"
          disabled={fetching}
          className='
            px-6 py-3 rounded-xl font-semibold
            bg-white/10 dark:bg-white/5 backdrop-blur-md
            border border-white/20 dark:border-white/10
            hover:scale-[1.03] hover:shadow-lg
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-300 cursor-pointer
          '
        >
          {fetching ? '...' : '🔍 Search'}
        </button>
      </form>

      {/* Error message */}
      {error && (
        <p className='text-center mt-5 text-red-400 text-sm'>{error}</p>
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
  )
}

export default SearchPage