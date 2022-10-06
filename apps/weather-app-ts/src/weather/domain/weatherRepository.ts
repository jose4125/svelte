import type { Weather } from './weatherEntity';

export interface WeatherRepository {
  city: string;
  weather: Weather;
  // actions
  getCity(): string;
  getWeather(): Weather;
  setWeather(weather: Weather): void;
}
