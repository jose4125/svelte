import type { Weather } from 'weather/domain/weatherEntity';
import { writable } from 'svelte/store';

const weatherStore = writable({
  weather: {
    city: '',
    country: '',
    degrees: 0,
    weatherIcon: '',
    maxDegrees: 0,
    minDegrees: 0,
    description: '',
  },
});

const loadInitialWeatherAction = (weatherData: Weather) => {
  weatherStore.set({
    weather: weatherData,
  });
};

const updateWeatherAction = (weatherData: Weather) => {
  weatherStore.update(currentWeather => {
    return { ...currentWeather, weather: weatherData };
  });
};

const weatherCustomStore = {
  store: weatherStore,
  loadInitialWeatherAction,
  updateWeatherAction,
};

export default weatherCustomStore;
