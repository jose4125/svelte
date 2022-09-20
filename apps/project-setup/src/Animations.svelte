<script>
  import { tweened } from 'svelte/motion';
  import { cubicIn, cubicOut } from 'svelte/easing';
  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';

  import Spring from './Spring.svelte';

  const progress = tweened(0, {
    delay: 0,
    duration: 700,
    easing: cubicIn,
  });

  setTimeout(() => {
    progress.set(0.5);
  }, 1500);

  let boxName = '';
  let boxes = [];
  let showParragraph = false;

  const addBox = () => {
    const newBox = boxName;
    boxes = [newBox, ...boxes];
    boxName = '';
  };

  const discard = value => {
    boxes = boxes.filter(box => box !== value);
  };

  const toggle = () => {
    showParragraph = !showParragraph;
  };
</script>

<div>
  <progress value={$progress} />
</div>

<!-- <Spring /> -->

<button on:click={toggle}>toggle</button>
{#if showParragraph}
  <p in:fade out:fly={{ x: 300 }}>can you see me</p>
{/if}
<hr />
<input type="text" bind:value={boxName} />
<button on:click={addBox}>add</button>
{#each boxes as box (box)}
  <div
    class="box"
    transition:fly={{ x: 200, y: 0 }}
    animate:flip={{ duration: 300, easing: cubicOut }}
    on:click={discard.bind(this, box)}
  >
    {box}
  </div>
{/each}

{#if showParragraph}
  {#each boxes as box (box)}
    <div
      class="box"
      transition:fly={{ x: 200, y: 0 }}
      on:click={discard.bind(this, box)}
    >
      {box}
    </div>
  {/each}
{/if}
{#if showParragraph}
  {#each boxes as box (box)}
    <div
      class="box"
      transition:fly|local={{ x: 200, y: 0 }}
      on:introstart={() => console.log('adding the element starts')}
      on:introend={() => console.log('adding the element ends')}
      on:outrostart={() => console.log('removing the element starts')}
      on:outroend={() => console.log('removing the element ends')}
      on:click={discard.bind(this, box)}
    >
      {box}
    </div>
  {/each}
{/if}

<style>
  .box {
    width: 10rem;
    height: 3rem;
    background: #ccc;
    margin: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    padding: 1rem;
  }
</style>
