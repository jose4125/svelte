<script>
  import Cart from './Cart/Cart.svelte';
  import Products from './Products/Products.svelte';
  import Button from './UI/Button.svelte';

  let showCart = true;

  const toggleCart = () => {
    showCart = !showCart;
  };
</script>

<Button on:click={toggleCart}>Toggle Cart</Button>
{#if showCart}
  <Cart />
{/if}
<Products />
