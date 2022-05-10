<script>
  import Input from './input.svelte';
  export let initialCounter = 0;

  $: isEvenorOdd = initialCounter % 2 == 0 ? 'is even' : 'is odd';
  $: if (initialCounter > 10) {
    initialCounter = 0;
  }

  const handleChange = () => {
    initialCounter++;
  };
</script>

<main>
  <button on:click={handleChange}>incrementar</button>
  <h1>count: {initialCounter}!</h1>
  <p>{isEvenorOdd}</p>
  <Input />
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
