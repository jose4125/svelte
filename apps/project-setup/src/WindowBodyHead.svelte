<script>
  let yScroll;

  let title = 'my title';

  const switchTitle = () => {
    title = 'a new title';
  };
</script>

<p>y: {yScroll}</p>
<svelte:window bind:scrollY={yScroll} />
<svelte:body on:mouseenter />
<svelte:head>
  <title>{title}</title>
</svelte:head>

<button on:click={switchTitle}>change title</button>
