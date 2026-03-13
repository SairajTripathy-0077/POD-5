import { getWeatherEmoji } from '../utils/weatherEmoji';

interface WeatherCardProps {
  weather: any;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  if (!weather) return null;

  return (
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
  );
}
