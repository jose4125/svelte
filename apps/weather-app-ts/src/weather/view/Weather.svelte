<script lang="ts">
  import { onMount } from 'svelte';
  import { weatherStoreImplementation } from 'weather/infrastructure/weatherStoreImplementation';
  import { weatherController } from 'weather/infrastructure/weatherController';
  import Alert from 'ui/Alert.svelte';
  import Spinner from 'ui/Spinner.svelte';
  import Button from 'ui/Button.svelte';
  import WeatherDetail from './WeatherDetail.svelte';

  let city = '';
  let isLoading = true;
  let error = '';

  const storeImp = weatherStoreImplementation();
  const { loadInitialWeather, updateWeather } = weatherController(storeImp);
  const { store } = storeImp;

  onMount(async () => {
    await loadInitialWeather();
    isLoading = false;
  });

  const handleSubmit = async () => {
    if (!city.trim()) {
      error = 'city field should not be empty';
      throw new Error(error);
    }
    isLoading = true;

    try {
      await updateWeather(city);
      error = '';
      isLoading = false;
      city = '';
    } catch (e) {
      error = 'the city was not found';
      isLoading = false;
      city = '';
      throw new Error(error);
    }
  };
</script>

<div class="container">
  <div class="row">
    <form on:submit|preventDefault={handleSubmit}>
      <label>
        city:<input class="form-control" bind:value={city} />
      </label>
      <Button {isLoading}>
        {isLoading ? 'searching...' : 'search'}
      </Button>
    </form>
  </div>
  {#if isLoading}
    <Spinner />
  {:else}
    <div class="row mt-4">
      <WeatherDetail data={$store} />
      <!-- <div class="col-12 col-md-6">
        <h1>
          <img
            class="bg-secondary"
            src={$store.weather.weatherIcon}
            alt={$store.weather.city}
          />
          {$store.weather.degrees}°C
        </h1>
        <h4>
          City:
          <span class="fw-bold">
            {$store.weather.city}, {$store.weather.country}
          </span>
        </h4>
        <h4>
          Weather: <span class="fw-bold">{$store.weather.description}</span>
        </h4>
      </div>
      <div class="col-12 col-md-6 ">
        <h4>
          Min Temp: <span class="fw-bold text-primary"
            >{$store.weather.minDegrees}°C</span
          >
        </h4>
        <h4>
          Max Temp: <span class="fw-bold text-danger"
            >{$store.weather.maxDegrees}°C</span
          >
        </h4>
      </div> -->
    </div>
    {#if error}
      <Alert message={error} />
    {/if}
  {/if}
</div>
