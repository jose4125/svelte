<script>
  import Products from './Products.svelte';
  import Card from './Card.svelte';

  let showProduct = true;
  let renderComponent = {
    cmp: Products,
    title: 'dinamic test Product',
  };

  const toggle = () => {
    showProduct = !showProduct;
    if (showProduct) {
      renderComponent = {
        cmp: Products,
        id: 'p1',
        title: 'dinamic test Product',
      };
    }

    if (!showProduct) {
      renderComponent = {
        cmp: Card,
        id: 'c1',
        title: 'dinamic test card',
      };
    }
  };
</script>

<button on:click={toggle}>Toggle display</button>

<svelte:component
  this={renderComponent.cmp}
  title={renderComponent.title}
  id={renderComponent.id}
/>
