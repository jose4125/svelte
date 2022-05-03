<script>
  export let Poster, Title, Type, Year;
</script>

<div>
  {#if Poster !== 'N/A'}
    <picture>
      <img src={Poster} alt={Title} />
    </picture>
  {/if}
  <h4>{Title}</h4>
  <p>{Type}</p>
  <p>{Year}</p>
</div>
