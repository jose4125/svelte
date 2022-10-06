export const weatherAdapter = ({ name, sys, main, weather }) => {
  return {
    city: name,
    country: sys.country,
    degrees: main.temp,
    maxDegrees: main.temp_max,
    minDegrees: main.temp_min,
    description: weather[0].description,
  };
};
