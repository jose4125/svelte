import { create } from 'weather/domain/weatherModel';
import type { WeatherResponse } from 'weather/domain/weatherResponseEntity';
import { weatherAdapter } from '../weatherAdapter';

const defaultCity = 'Bogota';

const openWeather = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '0ac25718d90bbdd5b62c60e6cb2fcf0c';

export const getWeatherService = async (city = defaultCity) => {
  const res = await fetch(
    `${openWeather}?q=${city}&units=metric&appid=${apiKey}`,
  );

  if (!res.ok) {
    throw new Error('the city was not found');
  }
  const weatherData = (await res.json()) as WeatherResponse;
  return create(weatherAdapter(weatherData));
};
