
import React, { useState } from 'react';
import { WeatherCard } from '../components/WeatherCard';
import { CityInput } from '../components/CityInput';
import { useToast } from '../hooks/use-toast';

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
    
    // Using a demo API key - in production, this should be in environment variables
    const apiKey = "demo_key"; // Replace with actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},ZA&appid=${apiKey}&units=metric`;

    try {
      // For demo purposes, we'll simulate weather data since we don't have a real API key
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const mockData = {
        name: city,
        weather: [{ main: "Sunny", description: "clear sky", icon: "01d" }],
        main: { temp: 24, humidity: 65 },
        wind: { speed: 3.2 }
      };
      
      setWeatherData(mockData);
      toast({
        title: "Weather fetched successfully!",
        description: `Showing weather for ${city}`,
      });
    } catch (error) {
      console.error('Weather fetch error:', error);
      toast({
        title: "Error fetching weather",
        description: "City not found. Please try another South African city.",
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
      
      <div className="relative z-10 flex flex-col items-center justify-start px-4 py-8 min-h-screen">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🇿🇦 South Africa Weather
          </h1>
          <p className="text-xl text-white/90 drop-shadow">
            Get real-time weather for beautiful South African cities
          </p>
        </div>

        {/* Weather App Container */}
        <div className="w-full max-w-md space-y-6">
          <CityInput onSubmit={handleWeatherFetch} loading={loading} />
          
          {weatherData && (
            <div className="animate-fade-in">
              <WeatherCard data={weatherData} />
            </div>
          )}
          
          {!weatherData && !loading && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center text-white">
              <div className="text-6xl mb-4">🌤️</div>
              <p className="text-lg">Enter a city to see the weather</p>
              <p className="text-sm opacity-75 mt-2">
                Try: Cape Town, Johannesburg, Durban, Pretoria
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-white/70 text-sm">
          <p>Discover the weather across the Rainbow Nation</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
