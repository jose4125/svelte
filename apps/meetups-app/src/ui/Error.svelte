<script>
  import Modal from 'ui/Modal.svelte';

  export let message;
</script>

<Modal title="An error ocurred!" on:cancel>
  <h2>{message}</h2>
</Modal>
