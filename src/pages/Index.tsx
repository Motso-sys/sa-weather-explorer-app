
import React, { useState } from 'react';
import { WeatherCard } from '../components/WeatherCard';
import { CityInput } from '../components/CityInput';
import { DateTime } from '../components/DateTime';
import { useToast } from '../hooks/use-toast';
import { fetchRealTimeWeather } from '../services/weatherService';

const Index = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleWeatherFetch = async (city: string) => {
    if (!city.trim()) {
      toast({
        title: "Enter a city name",
        description: "Please enter a South African city to get weather information.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      console.log(`Fetching real-time weather for: ${city}`);
      const data = await fetchRealTimeWeather(city);
      console.log('Weather data received:', data);
      
      setWeatherData(data);
      toast({
        title: "Weather fetched successfully!",
        description: `Showing real-time weather for ${city}`,
      });
    } catch (error) {
      console.error('Weather fetch error:', error);
      toast({
        title: "Error fetching weather",
        description: "Unable to fetch weather data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-green-500 to-yellow-400 relative overflow-hidden">
      {/* South African flag-inspired background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-1/6 bg-red-600"></div>
        <div className="absolute top-1/6 left-0 w-full h-1/6 bg-blue-800"></div>
        <div className="absolute top-2/6 left-0 w-full h-1/6 bg-green-600"></div>
        <div className="absolute top-3/6 left-0 w-full h-1/6 bg-yellow-400"></div>
        <div className="absolute top-4/6 left-0 w-full h-1/6 bg-white"></div>
        <div className="absolute top-5/6 left-0 w-full h-1/6 bg-black"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-start px-4 py-6 sm:py-8 min-h-screen">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-3 sm:mb-5 drop-shadow-xl tracking-wide">
            🇿🇦 South Africa Weather
          </h1>
          <p className="text-xl sm:text-2xl text-white/95 drop-shadow-lg px-2 font-medium tracking-wide">
            Get real-time weather for beautiful South African cities
          </p>
        </div>

        {/* Weather App Container */}
        <div className="w-full max-w-sm sm:max-w-md space-y-4 sm:space-y-6">
          <DateTime />
          <CityInput onSubmit={handleWeatherFetch} loading={loading} />
          
          {weatherData && (
            <div className="animate-fade-in">
              <WeatherCard data={weatherData} />
            </div>
          )}
          
          {!weatherData && !loading && (
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 sm:p-8 text-center text-white shadow-xl border border-white/20">
              <div className="text-6xl sm:text-7xl mb-5 filter drop-shadow-lg">🌤️</div>
              <p className="text-lg sm:text-xl font-semibold tracking-wide">Enter a city to see real-time weather</p>
              <p className="text-sm sm:text-base opacity-80 mt-3 font-medium tracking-wide">
                Try: Cape Town, Johannesburg, Durban, Pretoria
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 sm:mt-12 text-center text-white/80 text-sm sm:text-base px-4">
          <p className="font-medium tracking-wide">Discover real-time weather across the Rainbow Nation</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
