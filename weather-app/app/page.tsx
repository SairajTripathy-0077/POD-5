"use client"
import { useGeolocationWeather } from './hooks/useGeolocationWeather';
import WorldMapBg from './components/world-map-bg';
import Navbar from './components/navbar';
import WeatherCard from './components/weather-card';
import LocationButton from './components/location-button';

export default function Home() {
  const {
    weather,
    loading,
    userLocation,
    showButton,
    handleGetLocation
  } = useGeolocationWeather();

  return (
    <main className='relative z-20 min-h-screen'>
      <WorldMapBg
        userLocation={userLocation}
        isSearching={loading && !userLocation}
      />
      <Navbar />
      <h1 className='text-3xl font-bold text-center mt-10'>Weather App</h1>

      <LocationButton 
        loading={loading} 
        onGetLocation={handleGetLocation} 
        showButton={showButton} 
      />

      {/* Loading spinner */}
      {loading && (
        <div className='text-center mt-10'>
          <div className='inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin opacity-50' />
          <p className='mt-3 opacity-50'>Fetching weather...</p>
        </div>
      )}

      {/* Weather card */}
      {!loading && weather && <WeatherCard weather={weather} />}
    </main>
  );
}