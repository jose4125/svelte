import type { Weather } from 'weather/domain/weatherEntity';
import type { WeatherRepository } from 'weather/domain/weatherRepository';
import weatherCustomStore from './weatherStore';

export const weatherStoreImplementation = (): WeatherRepository => {
  const loadInitialWeather = (weather: Weather) => {
    weatherCustomStore.loadInitialWeatherAction(weather);
  };

  const updateWeather = (weather: Weather) => {
    weatherCustomStore.updateWeatherAction(weather);
  };

  return {
    store: weatherCustomStore.store,
    loadInitialWeather,
    updateWeather,
  };
};
