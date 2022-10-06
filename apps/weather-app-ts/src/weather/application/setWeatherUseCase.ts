import type { Weather } from 'weather/domain/weatherEntity';
import type { WeatherRepository } from 'weather/domain/weatherRepository';

type SetWeatherRepository = Pick<WeatherRepository, 'setWeather'>;

export const setWeatherUseCase = ({ setWeather, weather }) => {
  setWeather(weather);
};
