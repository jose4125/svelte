<script>
  import { createEventDispatcher } from 'svelte';

  export let title;
  export let price;
  export let id;
  export let bestSeller = false;

  const dispatch = createEventDispatcher();
</script>

<article>
  <h1>{title}</h1>
  <h2>{price}</h2>
  {#if bestSeller}
    <h3>BESTSELLER</h3>
  {/if}
  <button on:click={() => dispatch('add-to-cart', { id, title })}
    >Add to Cart</button
  >
  <button on:click={() => dispatch('delete', id)}>Delete </button>
</article>
