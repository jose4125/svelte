import type { Weather } from 'weather/domain/weatherEntity';
import { create } from 'weather/domain/weatherModel';
import { weatherAdapter } from '../weatherAdapter';

const openWeather = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '0ac25718d90bbdd5b62c60e6cb2fcf0c';

export const getWeatherService = async (city: Weather['city']) => {
  const res = await fetch(
    `${openWeather}?q=${city}&units=metric&appid=${apiKey}`,
  );
  const weatherData = await res.json();
  console.log('=== weather data', weatherData);
  return create(weatherAdapter(weatherData));
};
