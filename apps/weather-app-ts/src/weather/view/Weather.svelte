<script lang="ts">
  import { onMount } from 'svelte';
  import { weatherStoreImplementation } from 'weather/infrastructure/weatherStoreImplementation';
  import { weatherController } from 'weather/infrastructure/weatherController';

  let city = '';
  let isLoading = true;

  const storeImp = weatherStoreImplementation();
  const { loadInitialWeather, updateWeather } = weatherController(storeImp);
  const { store } = storeImp;

  onMount(async () => {
    await loadInitialWeather();
    isLoading = false;
  });

  const handleSubmit = async () => {
    isLoading = true;
    await updateWeather(city);
    isLoading = false;
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
      </div>
    </div>
  {/if}
</div>
