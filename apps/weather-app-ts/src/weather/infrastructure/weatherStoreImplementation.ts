import type { Weather } from 'weather/domain/weatherEntity';
import type { WeatherRepository } from 'weather/domain/weatherRepository';
import weatherCustomStore from './weatherStore';

export const weatherStoreImplementation = (): WeatherRepository => {
  const getWeather = cb => {
    weatherCustomStore.getWeatherAction(cb);
  };
  const setWeather = (weather: Weather) => {
    weatherCustomStore.setWeatherAction(weather);
  };

  return {
    getWeather,
    setWeather,
  };
};
