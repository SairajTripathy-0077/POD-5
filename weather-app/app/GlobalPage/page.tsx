"use client"
import { useState, useEffect } from 'react';
import fetchWeather from '../fetchWeather';
import WorldMapBg from '../components/world-map-bg';
import Navbar from '../components/navbar';
import WeatherCard from '../components/weather-card';
import { FAMOUS_CITIES } from '../utils/constants';

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

export default function GlobalPage() {
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
            // Re-map the API response to fit what WeatherCard expects
            // WeatherCard expects the raw OpenWeather API object shape
            // So we just store the raw data but add our custom country/emoji
            const fullData = {
              ...data,
              sys: { ...data.sys, country: `${country} ${emoji}` }
            };
            results.push(fullData as any);
          } catch (err) {
            console.error(`Failed to fetch weather for ${city}:`, err);
          }
        })
      );

      // We maintain the original order of FAMOUS_CITIES
      const sortedResults = FAMOUS_CITIES.map(c => 
        results.find((r: any) => r.name.toLowerCase() === c.city.toLowerCase() || r.sys.country.includes(c.country))
      ).filter(Boolean);

      setWeatherList(sortedResults as any);
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
          {weatherList.map((weatherData: any, index) => (
             <WeatherCard key={index} weather={weatherData} />
          ))}
        </div>
      )}
    </main>
  );
}