<script context="module">
  console.log('=== Runs once!');
  let deactivateNode;
</script>

<script>
  console.log('=== Runs multiple times!');
  export let member;

  let isActive;

  const setActive = () => {
    if (deactivateNode) {
      deactivateNode();
    }
    isActive = true;
    deactivateNode = deactivate;
  };

  const deactivate = () => {
    isActive = false;
  };
</script>

<div class="family-node" on:click={setActive} class:active={isActive}>
  <h1>{member.name}</h1>
  {#if member.isParent}
    <ul>
      {#each member.children as child}
        <li>
          <svelte:self member={child} />
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .family-node {
    margin-left: 2rem;
  }

  .active {
    border: 1px solid red;
  }
</style>
