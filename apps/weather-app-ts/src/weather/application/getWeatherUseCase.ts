import type { WeatherRepository } from 'weather/domain/weatherRepository';
// import { setWeatherUseCase } from 'weather/useCases/setWeatherUseCase';

type GetWeatherRepository = Pick<WeatherRepository, 'getWeather'>;
let weather;

export const getWeatherUseCase = ({ setWeather, getWeather }) => {
  getWeather(setWeather);
};
