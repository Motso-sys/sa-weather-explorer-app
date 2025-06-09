
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
      'Clear': 'from-yellow-400 to-orange-500',
      'Sunny': 'from-yellow-400 to-orange-500',
      'Clouds': 'from-gray-400 to-gray-600',
      'Rain': 'from-blue-500 to-blue-700',
      'Drizzle': 'from-blue-400 to-blue-600',
      'Thunderstorm': 'from-purple-600 to-purple-800',
      'Snow': 'from-blue-200 to-blue-400',
      'Mist': 'from-gray-300 to-gray-500'
    };
    return gradientMap[main] || 'from-blue-400 to-blue-600';
  };

  const weatherMain = data.weather[0]?.main || 'Clear';
  const backgroundGradient = getBackgroundGradient(weatherMain);

  return (
    <Card className={`bg-gradient-to-br ${backgroundGradient} text-white border-none shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300`}>
      <div className="p-6 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white transform translate-x-8 -translate-y-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white transform -translate-x-4 translate-y-4"></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <h2 className="text-2xl font-bold">{data.name}</h2>
            </div>
            <div className="text-5xl">
              {getWeatherEmoji(weatherMain)}
            </div>
          </div>

          {/* Temperature */}
          <div className="text-center mb-6">
            <div className="text-5xl font-bold mb-2">
              {Math.round(data.main.temp)}°C
            </div>
            <div className="text-lg capitalize opacity-90">
              {data.weather[0]?.description || 'Clear sky'}
            </div>
          </div>

          {/* Weather details */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center bg-white/20 rounded-xl p-3 backdrop-blur-sm">
              <Thermometer className="h-6 w-6 mx-auto mb-2" />
              <div className="text-sm opacity-75">Feels like</div>
              <div className="font-bold">{Math.round(data.main.temp)}°C</div>
            </div>
            
            <div className="text-center bg-white/20 rounded-xl p-3 backdrop-blur-sm">
              <Droplets className="h-6 w-6 mx-auto mb-2" />
              <div className="text-sm opacity-75">Humidity</div>
              <div className="font-bold">{data.main.humidity}%</div>
            </div>
            
            <div className="text-center bg-white/20 rounded-xl p-3 backdrop-blur-sm">
              <Wind className="h-6 w-6 mx-auto mb-2" />
              <div className="text-sm opacity-75">Wind</div>
              <div className="font-bold">{data.wind.speed} m/s</div>
            </div>
          </div>

          {/* Weather condition badge */}
          <div className="mt-6 text-center">
            <span className="inline-block bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              {data.weather[0]?.main || 'Clear'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
