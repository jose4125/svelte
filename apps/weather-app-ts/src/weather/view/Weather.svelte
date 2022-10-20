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
      <Button type="submit" {isLoading} buttonType="btn-info">
        {isLoading ? 'searching...' : 'search'}
      </Button>
    </form>
  </div>
  {#if isLoading}
    <div class="d-flex justify-content-center">
      <Spinner textStyle="text-info" />
    </div>
  {:else}
    <div class="row mt-4">
      <WeatherDetail data={$store} />
    </div>
    {#if error}
      <Alert message={error} />
    {/if}
  {/if}
</div>
