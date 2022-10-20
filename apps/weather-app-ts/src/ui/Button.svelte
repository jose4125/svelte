<script lang="ts">
  import Spinner from './Spinner.svelte';

  export let type = 'button';
  export let buttonType = 'btn-primary';
  export let isLoading = false;
</script>

<button {type} class={`btn ${buttonType}`} disabled={isLoading}>
  {#if isLoading}
    <Spinner
      size="spinner-border-sm"
      ariaHidden={true}
      hasLoadingText={false}
    />
  {/if}
  <slot />
</button>
