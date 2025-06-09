
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
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
          <Input
            type="text"
            placeholder="Enter South African city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="pl-10 bg-white/90 border-white/30 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-white/50 transition-all duration-200"
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Getting Weather...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Get Weather</span>
            </div>
          )}
        </Button>
      </form>

      {/* Popular Cities */}
      <div className="mt-6">
        <p className="text-white/70 text-sm mb-3 text-center">Popular cities:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {popularCities.slice(0, 4).map((popularCity) => (
            <button
              key={popularCity}
              onClick={() => handleCityClick(popularCity)}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-xs rounded-full transition-all duration-200 transform hover:scale-105"
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
