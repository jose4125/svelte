import type { Writable } from 'svelte/store';
import type { Weather } from './weatherEntity';
export interface WeatherRepository {
  loadInitialWeather(weather: Weather): void;
  updateWeather(weather: Weather): void;
  store: Writable<{
    weather: {
      city: string;
      country: string;
      degrees: number;
      weatherIcon: string;
      maxDegrees: number;
      minDegrees: number;
      description: string;
    };
  }>;
}

export type SetWeatherRepository =
  | WeatherRepository['loadInitialWeather']
  | WeatherRepository['updateWeather'];
