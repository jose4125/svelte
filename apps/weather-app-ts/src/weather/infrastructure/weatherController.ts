import { getWeatherService } from './services/getWeatherService';
import { setWeatherUseCase } from 'weather/application/setWeatherUseCase';
import type { WeatherRepository } from 'weather/domain/weatherRepository';
import type { Weather } from 'weather/domain/weatherEntity';

export const weatherController = (store: WeatherRepository) => {
  const loadInitialWeather = async () => {
    const newWeather = await getWeatherService();
    setWeatherUseCase({
      setWeather: store.loadInitialWeather,
      weather: newWeather,
    });
  };

  const updateWeather = async (city: Weather['city']) => {
    const newWeather = await getWeatherService(city);
    setWeatherUseCase({
      setWeather: store.updateWeather,
      weather: newWeather,
    });
  };

  return {
    loadInitialWeather,
    updateWeather,
  };
};
