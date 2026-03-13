"use client"
import { useState, useEffect } from 'react';
import fetchWeather from '../fetchWeather';
import WorldMapBg from '../components/world-map-bg';
import Navbar from '../components/navbar';
import { getWeatherEmoji } from '../utils/weatherEmoji';

// Top 10 famous capital cities
const FAMOUS_CITIES = [
  { city: "New York", country: "USA", emoji: "🇺🇸" },
  { city: "London", country: "UK", emoji: "🇬🇧" },
  { city: "Tokyo", country: "Japan", emoji: "🇯🇵" },
  { city: "Paris", country: "France", emoji: "🇫🇷" },
  { city: "Sydney", country: "Australia", emoji: "🇦🇺" },
  { city: "Dubai", country: "UAE", emoji: "🇦🇪" },
  { city: "Moscow", country: "Russia", emoji: "🇷🇺" },
  { city: "Singapore", country: "Singapore", emoji: "🇸🇬" },
  { city: "Cairo", country: "Egypt", emoji: "🇪🇬" },
  { city: "Rio de Janeiro", country: "Brazil", emoji: "🇧🇷" },
];

// Map weather condition to emoji


interface CityWeather {
  city: string;
  country: string;
  emoji: string;
  temp: number;
  description: string;
  weatherMain: string;
  humidity: number;
  feelsLike: number;
  coord: { lat: number; lng: number };
}

const GlobalPage = () => {
  const [weatherList, setWeatherList] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const results: CityWeather[] = [];

      await Promise.all(
        FAMOUS_CITIES.map(async ({ city, country, emoji }) => {
          try {
            const data = await fetchWeather(city);
            results.push({
              city: data.name,
              country,
              emoji,
              temp: Math.round(data.main.temp),
              description: data.weather[0].description,
              weatherMain: data.weather[0].main,
              humidity: data.main.humidity,
              feelsLike: Math.round(data.main.feels_like),
              coord: { lat: data.coord.lat, lng: data.coord.lon },
            });
          } catch (err) {
            console.error(`Failed to fetch weather for ${city}:`, err);
          }
        })
      );

      setWeatherList(results);
      setLoading(false);
    }

    fetchAll();
  }, []);

  return (
    <main className='relative z-20 min-h-screen pb-10'>
      <WorldMapBg />
      <Navbar />

      <h1 className='text-3xl font-bold text-center mt-10'>Global Weather</h1>
      <p className='text-center mt-2 opacity-60'>Live weather from 10 famous cities around the world</p>

      {loading ? (
        <div className='text-center mt-16'>
          <div className='inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin opacity-50' />
          <p className='mt-4 opacity-50'>Fetching global weather...</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-[90%] max-w-6xl mx-auto mt-8'>
          {weatherList.map((w) => (
            <div
              key={w.city}
              className='
                relative overflow-hidden rounded-2xl p-5
                bg-white/10 dark:bg-white/5
                backdrop-blur-md
                border border-white/20 dark:border-white/10
                hover:scale-[1.03] hover:shadow-lg
                transition-all duration-300 cursor-default
              '
            >
              {/* City header */}
              <div className='flex items-center justify-between mb-3'>
                <div>
                  <h3 className='text-lg font-bold'>{w.emoji} {w.city}</h3>
                  <p className='text-xs opacity-50'>{w.country}</p>
                </div>
                <span className='text-3xl'>{getWeatherEmoji(w.weatherMain)}</span>
              </div>

              {/* Temperature */}
              <div className='text-4xl font-bold mb-1'>{w.temp}°C</div>
              <p className='text-sm capitalize opacity-70 mb-3'>{w.description}</p>

              {/* Details */}
              <div className='flex gap-4 text-xs opacity-60'>
                <span>Feels like <strong>{w.feelsLike}°C</strong></span>
                <span>Humidity <strong>{w.humidity}%</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default GlobalPage