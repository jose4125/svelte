<script>
  import Movie from './Movie.svelte';

  let value = '';
  let movieList = [];
  let apiError = '';
  const apiKey = '8c8417f';

  const handleChange = event => {
    value = event.target.value;
  };

  $: if (value.length >= 3) {
    movieList = [];
    apiError = '';
    movieList = fetch(`https://www.omdbapi.com/?s=${value}&apikey=${apiKey}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(res);
      })
      .then(apiRes => {
        if (apiRes.Error) {
          apiError = apiRes.Error;
          return [];
        }
        return apiRes.Search || [];
      });
  }
</script>

<input
  type="text"
  {value}
  on:input={handleChange}
  placeholder="search movies test"
/>
<p>hola</p>

{#await movieList}
  <p>Loading...</p>
{:then movies}
  {#if apiError}
    <p>{apiError}</p>
  {:else}
    <p>Tenemos {movies.length} peliculasss</p>
  {/if}
  {#each movies as movie}
    <Movie {...movie} />
  {:else}
    <p>No hay resultados</p>
  {/each}
{:catch error}
  <p>algo salio mal! estamos trabajando para mejorar</p>
{/await}
