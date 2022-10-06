<script lang="ts">
  import type { Weather } from 'weather/domain/weatherEntity';
  import { weatherStoreImplementation } from 'weather/infrastructure/weatherStoreImplementation';
  import { weatherController } from 'weather/infrastructure/weatherController';

  let weather: Weather;
  let city = '';
  let isLoading = false;

  const store = weatherStoreImplementation();
  const { getWeather, setWeather } = weatherController(store);

  const setNewWeather = (weatherData: Weather) => {
    weather = weatherData;
    isLoading = false;
  };

  getWeather(setNewWeather);

  const handleSubmit = () => {
    isLoading = true;
    setWeather(city);
    city = '';
  };
</script>

<div class="container">
  <div class="row">
    <form on:submit|preventDefault={handleSubmit}>
      <label>
        city:<input class="form-control" bind:value={city} />
      </label>
      <button type="submit" class="btn btn-info">search</button>
    </form>
  </div>
  {#if isLoading}
    <div class="row mt-4 justify-content-center">The weather is loading...</div>
  {:else}
    <div class="row mt-4">
      <div class="col-12 col-md-6">
        <h1>
          <img class="bg-secondary" src={weather.weatherIcon} alt={city} />
          {weather.degrees}°C
        </h1>
        <h4>
          City:
          <span class="fw-bold">
            {weather.city}, {weather.country}
          </span>
        </h4>
        <h4>Weather: <span class="fw-bold">{weather.description}</span></h4>
      </div>
      <div class="col-12 col-md-6 ">
        <h4>
          Min Temp: <span class="fw-bold text-primary"
            >{weather.minDegrees}°C</span
          >
        </h4>
        <h4>
          Max Temp: <span class="fw-bold text-danger"
            >{weather.maxDegrees}°C</span
          >
        </h4>
      </div>
    </div>
  {/if}
</div>
