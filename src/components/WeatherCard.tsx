
import React from 'react';
import { Card } from './ui/card';
import { Thermometer, Droplets, Wind, MapPin } from 'lucide-react';

interface WeatherData {
  name: string;
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const getWeatherEmoji = (main: string) => {
    const emojiMap: { [key: string]: string } = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Smoke': '🌫️',
      'Haze': '🌫️',
      'Dust': '🌫️',
      'Fog': '🌫️',
      'Sand': '🌫️',
      'Ash': '🌫️',
      'Squall': '💨',
      'Tornado': '🌪️',
      'Sunny': '☀️'
    };
    return emojiMap[main] || '🌤️';
  };

  const getBackgroundGradient = (main: string) => {
    const gradientMap: { [key: string]: string } = {
      'Clear': 'from-yellow-400 via-orange-400 to-red-500',
      'Sunny': 'from-yellow-400 via-orange-400 to-red-500',
      'Clouds': 'from-gray-400 via-gray-500 to-gray-600',
      'Rain': 'from-blue-500 via-blue-600 to-blue-700',
      'Drizzle': 'from-blue-400 via-blue-500 to-blue-600',
      'Thunderstorm': 'from-purple-600 via-purple-700 to-purple-800',
      'Snow': 'from-blue-200 via-blue-300 to-blue-400',
      'Mist': 'from-gray-300 via-gray-400 to-gray-500'
    };
    return gradientMap[main] || 'from-blue-400 via-blue-500 to-blue-600';
  };

  const weatherMain = data.weather[0]?.main || 'Clear';
  const backgroundGradient = getBackgroundGradient(weatherMain);

  return (
    <Card className={`bg-gradient-to-br ${backgroundGradient} text-white border-none shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300`}>
      <div className="p-5 sm:p-7 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white transform translate-x-6 sm:translate-x-10 -translate-y-6 sm:-translate-y-10"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white transform -translate-x-3 sm:-translate-x-6 translate-y-3 sm:translate-y-6"></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-5 sm:mb-7">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-white/90" />
              <h2 className="text-2xl sm:text-3xl font-bold truncate tracking-wide text-white/95">{data.name}</h2>
            </div>
            <div className="text-4xl sm:text-6xl filter drop-shadow-lg">
              {getWeatherEmoji(weatherMain)}
            </div>
          </div>

          {/* Temperature */}
          <div className="text-center mb-5 sm:mb-7">
            <div className="text-5xl sm:text-7xl font-bold mb-2 sm:mb-3 text-white/95 tracking-tight filter drop-shadow-lg">
              {Math.round(data.main.temp)}°C
            </div>
            <div className="text-lg sm:text-2xl capitalize opacity-90 font-medium tracking-wide text-white/90">
              {data.weather[0]?.description || 'Clear sky'}
            </div>
          </div>

          {/* Weather details */}
          <div className="grid grid-cols-3 gap-3 sm:gap-5 mt-5 sm:mt-7">
            <div className="text-center bg-white/25 rounded-lg sm:rounded-xl p-3 sm:p-4 backdrop-blur-sm shadow-lg">
              <Thermometer className="h-5 w-5 sm:h-7 sm:w-7 mx-auto mb-2 text-red-200" />
              <div className="text-xs sm:text-sm opacity-80 font-medium">Feels like</div>
              <div className="font-bold text-base sm:text-xl text-white/95">{Math.round(data.main.temp)}°C</div>
            </div>
            
            <div className="text-center bg-white/25 rounded-lg sm:rounded-xl p-3 sm:p-4 backdrop-blur-sm shadow-lg">
              <Droplets className="h-5 w-5 sm:h-7 sm:w-7 mx-auto mb-2 text-blue-200" />
              <div className="text-xs sm:text-sm opacity-80 font-medium">Humidity</div>
              <div className="font-bold text-base sm:text-xl text-white/95">{data.main.humidity}%</div>
            </div>
            
            <div className="text-center bg-white/25 rounded-lg sm:rounded-xl p-3 sm:p-4 backdrop-blur-sm shadow-lg">
              <Wind className="h-5 w-5 sm:h-7 sm:w-7 mx-auto mb-2 text-green-200" />
              <div className="text-xs sm:text-sm opacity-80 font-medium">Wind</div>
              <div className="font-bold text-base sm:text-xl text-white/95">{data.wind.speed} m/s</div>
            </div>
          </div>

          {/* Weather condition badge */}
          <div className="mt-5 sm:mt-7 text-center">
            <span className="inline-block bg-white/35 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-lg font-semibold tracking-wide text-white/95 shadow-lg">
              {data.weather[0]?.main || 'Clear'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
