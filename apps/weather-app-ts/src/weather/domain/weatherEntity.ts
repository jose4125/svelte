import type { Writable } from 'svelte/store';

export interface Weather {
  city: string;
  country: string;
  degrees: number;
  weatherIcon: string;
  maxDegrees: number;
  minDegrees: number;
  description: string;
}

export interface WeatherStore {
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
