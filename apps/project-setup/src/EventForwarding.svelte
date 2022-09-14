<script>
  import Book from './Book.svelte';

  const products = [
    {
      id: 'p1',
      title: 'A book',
      price: 9.99,
    },
    {
      id: 'p2',
      title: 'A second book',
      price: 12.99,
      bestSeller: true,
    },
  ];

  const addToCart = event => {
    console.log(event);
    const { id, title } = event.detail;
    alert(`product id: ${id} - product name: ${title}`);
  };

  const deleteProduct = event => {
    console.log('id', event.detail);
  };
</script>

{#each products as product}
  <Book {...product} on:add-to-cart={addToCart} on:delete={deleteProduct} />
{/each}
