import { getWeatherService } from './services/getWeatherService';
import { getWeatherUseCase } from 'weather/application/getWeatherUseCase';
import { setWeatherUseCase } from 'weather/application/setWeatherUseCase';

export const weatherController = store => {
  const getWeather = cb => {
    getWeatherUseCase({ getWeather: store.getWeather, setWeather: cb });
  };

  const setWeather = async (city: string) => {
    const newWeather = await getWeatherService(city);
    setWeatherUseCase({ setWeather: store.setWeather, weather: newWeather });
    // store.setWeather(newWeather);
  };

  return {
    getWeather,
    setWeather,
  };
};
