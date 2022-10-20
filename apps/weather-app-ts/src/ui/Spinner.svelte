<script>
  export let textStyle = '';
  export let size = '';
  export let ariaHidden = false;
  export let hasLoadingText = true;
</script>

<span
  class={`spinner-border ${size} ${textStyle}`}
  role="status"
  aria-hidden={ariaHidden}
>
  {#if hasLoadingText}
    <span class="visually-hidden">Loading...</span>
  {/if}
</span>
