<script lang="ts">
  import type { WeatherStore } from 'weather/domain/weatherEntity';

  export let data: WeatherStore;
</script>

<div class="col-12 col-md-6">
  <h1>
    <img
      class="bg-secondary"
      src={data.weather.weatherIcon}
      alt={data.weather.city}
    />
    {data.weather.degrees}°C
  </h1>
  <h4>
    City:
    <span class="fw-bold">
      {data.weather.city}, {data.weather.country}
    </span>
  </h4>
  <h4>
    Weather: <span class="fw-bold">{data.weather.description}</span>
  </h4>
</div>
<div class="col-12 col-md-6 ">
  <h4>
    Min Temp: <span class="fw-bold text-primary"
      >{data.weather.minDegrees}°C</span
    >
  </h4>
  <h4>
    Max Temp: <span class="fw-bold text-danger"
      >{data.weather.maxDegrees}°C</span
    >
  </h4>
</div>
