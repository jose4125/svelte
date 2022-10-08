import type { Weather } from 'weather/domain/weatherEntity';
import type { SetWeatherRepository } from 'weather/domain/weatherRepository';

interface SetWeatherUseCase {
  setWeather: SetWeatherRepository;
  weather: Weather;
}

export const setWeatherUseCase = ({
  setWeather,
  weather,
}: SetWeatherUseCase) => {
  setWeather(weather);
};
