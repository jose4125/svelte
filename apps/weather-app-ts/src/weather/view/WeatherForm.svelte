<script lang="ts">
  import Button from 'ui/Button.svelte';

  export let isLoading = true;
  export let handleSubmit: () => void;

  let city = '';
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    city:<input class="form-control" bind:value={city} />
  </label>
  <Button {isLoading}>
    {isLoading ? 'searching...' : 'search'}
  </Button>
</form>
