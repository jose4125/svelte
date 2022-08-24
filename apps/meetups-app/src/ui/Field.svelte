<script>
  export let name, id, value, placeholder, label;
  export let type = 'text';
  export let valid = true;
  export let errorMessage = '';

  let touched = false;

  const wasTouched = () => {
    touched = true;
  };
</script>

<div class="form-control">
  <label for={id}>{label}</label>
  {#if type === 'textarea'}
    <textarea
      class:invalid={!valid && touched}
      {id}
      cols="30"
      rows="10"
      {value}
      on:input
      on:blur={wasTouched}
    />
  {:else}
    <input
      class:invalid={!valid && touched}
      {type}
      {name}
      {id}
      {value}
      {placeholder}
      on:input
      on:blur={wasTouched}
    />
  {/if}
  {#if errorMessage && !valid && touched}
    <p class="error">{errorMessage}</p>
  {/if}
</div>

<style>
  input,
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: none;
    border-bottom: 2px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: white;
    padding: 0.15rem 0.25rem;
    transition: border-color 0.1s ease-out;
  }

  input:focus,
  textarea:focus {
    border-color: #e40763;
    outline: none;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  .form-control {
    padding: 0.5rem 0;
    width: 100%;
    margin: 0.25rem 0;
  }

  .invalid {
    border: 1px solid red;
    background: #fde3e3;
  }

  .error {
    color: red;
    margin: 0.25rem 0;
  }
</style>
