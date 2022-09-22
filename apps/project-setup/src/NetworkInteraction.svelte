<script>
  import { onMount } from 'svelte';
  import hobbiesStore from './hobbiesStore.js';

  let hobbies = [];
  let hobbyInput;
  let isLoading = false;

  $: isDisable = isLoading || !hobbyInput?.length;

  onMount(() => {
    fetch('https://svelte-course-jd-default-rtdb.firebaseio.com/hobbies.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed request!');
        }
        return res.json();
      })
      .then(data => {
        const hobbiesData = Object.values(data);
        hobbies = Object.values(hobbiesData);
        hobbiesStore.setHobbies(hobbiesData);
      })
      .catch(err => {
        console.log(err);
      });
  });

  const addHobby = () => {
    isLoading = true;
    fetch('https://svelte-course-jd-default-rtdb.firebaseio.com/hobbies.json', {
      method: 'POST',
      body: JSON.stringify(hobbyInput),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        isLoading = false;
        if (!res.ok) {
          throw new Error('Failed request!');
        }
        console.log('success');
        hobbies = [...hobbies, hobbyInput];
        hobbiesStore.addHobby(hobbyInput);
        hobbyInput = '';
      })
      .catch(err => {
        isLoading = false;
        hobbyInput = '';
        console.log(err);
      });
  };
</script>

<label for="hobby">
  <input type="text" name="hobby" bind:value={hobbyInput} />
</label>
<button class="nbutton" on:click={addHobby} disabled={isDisable}>
  {isLoading ? '...' : 'Add Hobby'}
</button>
{#if isLoading}
  <p>Loading...</p>
{:else}
  <ul>
    {#each hobbies as hobby}
      <li>{hobby}</li>
    {/each}
  </ul>
{/if}
<h3>from store</h3>
{#if isLoading}
  <p>Loading...</p>
{:else}
  <ul>
    {#each $hobbiesStore as hobby}
      <li>{hobby}</li>
    {/each}
  </ul>
{/if}

<style>
  .nbutton {
    min-width: 112px;
  }
  .nbutton:disabled {
    background-color: gray;
  }
</style>
