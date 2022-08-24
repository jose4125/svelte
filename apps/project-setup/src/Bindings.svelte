<script>
  import App from './App.svelte';
  import ContactCard from './ContactCard.svelte';

  import CustomInput from './CustomInput.svelte';
  import { isValidEmail } from './isValidEmail.js';

  let val = 'Max';
  let price = 0;
  let agreed;
  let selectColors = ['green'];
  let favColor = 'red';
  let optionColor = 'red';
  let usernameInput = '';
  let someDiv;
  let enterEmail = '';
  let formIsValid = false;

  $: if (isValidEmail(enterEmail)) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const setValue = event => {
    val = event.target.value;
  };

  const saveData = () => {
    console.dir('div', someDiv);
  };

  const submitForm = () => {
    alert('submit');
  };
</script>

<h4>manual bind: <code>value=..., on:input=...</code></h4>
<input type="text" value={val} on:input={setValue} />
short bind:
<h4>short bind: <code>bind:value=...</code></h4>
<input type="text" bind:value={val} />
<h4>custom bind: <code>bind:customVal=...</code></h4>
<CustomInput bind:customVal={val} />
<h4>number bind: <code>bind:value=...</code></h4>
<input type="number" bind:value={price} />
<h4>checkbox bind: <code>bind:checked=...</code></h4>
<label>
  <input type="checkbox" bind:checked={agreed} />
  Agree
</label>
<h4>checkbox group bind: <code>value="...", bind:group=...</code></h4>
<label>
  <input type="checkbox" name="color" value="red" bind:group={selectColors} />
  red
</label>
<label>
  <input type="checkbox" name="color" value="green" bind:group={selectColors} />
  green
</label>
<label>
  <input type="checkbox" name="color" value="blue" bind:group={selectColors} />
  blue
</label>
<h4>radio bind: <code>value="...", bind:group=...</code></h4>
<label>
  <input type="radio" name="color" value="red" bind:group={favColor} />
  red
</label>
<label>
  <input type="radio" name="color" value="green" bind:group={favColor} />
  green
</label>
<label>
  <input type="radio" name="color" value="blue" bind:group={favColor} />
  blue
</label>
<h4>select bind: <code>value="...", bind:selected=...</code></h4>
<select name="color" bind:value={optionColor}>
  <option value="red">red</option>
  <option value="blue">blue</option>
  <option value="green">green</option>
</select>
<h4>element bind: <code>bind:this=...</code></h4>
<input type="text" bind:this={usernameInput} />
<button on:click={saveData}>Save</button>
<div bind:this={someDiv} />

<h4>validating forms</h4>
<form on:submit|preventDefault={submitForm}>
  form valid: {formIsValid}
  <input
    type="email"
    bind:value={enterEmail}
    class:not-valid={!isValidEmail(enterEmail)}
  />
  <button type="submit" disabled={!formIsValid}>submit</button>
</form>

<style>
  code {
    font-family: Consolas, 'courier new';
    color: crimson;
    background-color: #fdfdfdc9;
    padding: 2px;
    font-size: 105%;
  }

  input[type='checkbox'],
  input[type='radio'] {
    display: inline;
    width: auto;
  }

  .not-valid {
    border: 1px solid red;
  }
</style>
