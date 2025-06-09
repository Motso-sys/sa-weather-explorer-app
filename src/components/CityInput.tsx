
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, MapPin } from 'lucide-react';

interface CityInputProps {
  onSubmit: (city: string) => void;
  loading: boolean;
}

const popularCities = [
  'Cape Town', 'Johannesburg', 'Durban', 'Pretoria', 
  'Port Elizabeth', 'Bloemfontein', 'East London', 'Pietermaritzburg'
];

export const CityInput: React.FC<CityInputProps> = ({ onSubmit, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(city);
  };

  const handleCityClick = (selectedCity: string) => {
    setCity(selectedCity);
    onSubmit(selectedCity);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300 h-5 w-5 sm:h-6 sm:w-6" />
          <Input
            type="text"
            placeholder="Enter South African city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="pl-10 sm:pl-12 bg-white/95 border-white/40 text-gray-800 placeholder:text-gray-600 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200 text-base sm:text-lg h-12 sm:h-14 font-medium shadow-inner"
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 sm:py-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:scale-100 text-base sm:text-lg h-auto shadow-lg"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent"></div>
              <span className="font-semibold tracking-wide">Getting Weather...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-semibold tracking-wide">Get Weather</span>
            </div>
          )}
        </Button>
      </form>

      {/* Popular Cities */}
      <div className="mt-5 sm:mt-6">
        <p className="text-white/90 text-sm sm:text-base mb-3 text-center font-medium tracking-wide">Popular cities:</p>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center">
          {popularCities.slice(0, 4).map((popularCity) => (
            <button
              key={popularCity}
              onClick={() => handleCityClick(popularCity)}
              className="px-3 sm:px-4 py-2 bg-white/25 hover:bg-white/35 text-white text-sm sm:text-base rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 min-h-[32px] sm:min-h-[36px] flex items-center justify-center font-medium shadow-md hover:shadow-lg"
              disabled={loading}
            >
              {popularCity}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
