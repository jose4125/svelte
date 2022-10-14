<script lang="ts">
  export let isLoading = false;
</script>

<button type="submit" class="btn btn-info" disabled={isLoading}>
  {#if isLoading}
    <span
      class="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    />
  {/if}
  <slot />
</button>
