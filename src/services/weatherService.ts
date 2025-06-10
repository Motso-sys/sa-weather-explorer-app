
import { fetchWeatherApi } from 'openmeteo';

interface WeatherResponse {
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

// South African cities with their coordinates
const cityCoordinates: { [key: string]: { lat: number; lon: number } } = {
  'Cape Town': { lat: -33.9249, lon: 18.4241 },
  'Johannesburg': { lat: -26.2041, lon: 28.0473 },
  'Durban': { lat: -29.8587, lon: 31.0218 },
  'Pretoria': { lat: -25.7479, lon: 28.2293 },
  'Port Elizabeth': { lat: -33.9608, lon: 25.6022 },
  'Bloemfontein': { lat: -29.0852, lon: 26.1596 },
  'East London': { lat: -33.0153, lon: 27.9116 },
  'Pietermaritzburg': { lat: -29.6195, lon: 30.3927 }
};

export const fetchRealTimeWeather = async (cityName: string): Promise<WeatherResponse> => {
  // Get coordinates for the city
  const coordinates = cityCoordinates[cityName] || cityCoordinates['Cape Town'];
  
  const params = {
    latitude: coordinates.lat,
    longitude: coordinates.lon,
    current: ["temperature_2m", "relative_humidity_2m", "wind_speed_10m", "weather_code"],
    timezone: "Africa/Johannesburg"
  };
  
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);
  
  // Process the response
  const response = responses[0];
  const current = response.current()!;
  
  // Get current weather values
  const temperature = current.variables(0)!.value(); // temperature_2m
  const humidity = current.variables(1)!.value(); // relative_humidity_2m
  const windSpeed = current.variables(2)!.value(); // wind_speed_10m
  const weatherCode = current.variables(3)!.value(); // weather_code
  
  // Map weather codes to descriptions
  const getWeatherFromCode = (code: number) => {
    if (code === 0) return { main: 'Clear', description: 'clear sky', icon: '01d' };
    if (code <= 3) return { main: 'Clouds', description: 'partly cloudy', icon: '02d' };
    if (code <= 48) return { main: 'Clouds', description: 'cloudy', icon: '03d' };
    if (code <= 67) return { main: 'Rain', description: 'rainy', icon: '09d' };
    if (code <= 77) return { main: 'Snow', description: 'snowy', icon: '13d' };
    if (code <= 82) return { main: 'Rain', description: 'shower rain', icon: '09d' };
    if (code <= 99) return { main: 'Thunderstorm', description: 'thunderstorm', icon: '11d' };
    return { main: 'Clear', description: 'clear sky', icon: '01d' };
  };
  
  const weatherInfo = getWeatherFromCode(weatherCode);
  
  return {
    name: cityName,
    weather: [weatherInfo],
    main: {
      temp: Math.round(temperature),
      humidity: Math.round(humidity)
    },
    wind: {
      speed: Math.round(windSpeed * 10) / 10 // Round to 1 decimal
    }
  };
};
