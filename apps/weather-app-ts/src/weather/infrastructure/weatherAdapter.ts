import type { WeatherResponse } from 'weather/domain/weatherResponseEntity';

export const weatherAdapter = ({
  name,
  sys,
  main,
  weather,
}: WeatherResponse) => {
  return {
    city: name,
    country: sys.country,
    degrees: main.temp,
    weatherIcon: `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
    maxDegrees: main.temp_max,
    minDegrees: main.temp_min,
    description: weather[0].description,
  };
};
