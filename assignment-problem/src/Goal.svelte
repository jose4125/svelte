<script>
  export let title;


  $: alertClass = title.includes('!')
</script>

<h1 class:alert="{alertClass}">{title}</h1>

<style>
  .alert {
    color: red
  }
</style>
