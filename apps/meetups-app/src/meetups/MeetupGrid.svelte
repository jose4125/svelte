<script>
  import MeetupItem from 'meetups/MeetupItem.svelte';

  export let meetups;
</script>

<section class="meetup">
  {#each meetups as meetup}
    <MeetupItem {...meetup} on:togglefavorite />
  {/each}
</section>

<style>
  .meetup {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  @media (min-width: 768px) {
    .meetup {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
