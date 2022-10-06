import type { Weather } from 'weather/domain/weatherEntity';
import { writable } from 'svelte/store';

const weatherStore = writable({
  weather: {
    city: '',
    country: '',
    degrees: 0,
    maxDegrees: 0,
    minDegrees: 0,
    description: '',
  },
});

const getWeatherAction = cb => {
  weatherStore.subscribe(currentWeather => {
    cb(currentWeather.weather);
  });
};

const setWeatherAction = (weatherData: Weather) => {
  console.log('=== data', weatherData);
  weatherStore.set({
    weather: weatherData,
  });
};

const weatherCustomStore = {
  subscribe: weatherStore.subscribe,
  setWeatherAction,
  getWeatherAction,
};

export default weatherCustomStore;
