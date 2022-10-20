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
  weather: {
    city: string;
    country: string;
    degrees: number;
    weatherIcon: string;
    maxDegrees: number;
    minDegrees: number;
    description: string;
  };
}
