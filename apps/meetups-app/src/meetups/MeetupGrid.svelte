<script>
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import MeetupItem from 'meetups/MeetupItem.svelte';
  import MeetupFilter from 'meetups/MeetupFilter.svelte';
  import Button from 'ui/Button.svelte';

  export let meetups;

  const dispatch = createEventDispatcher();
  let filter = 'all';
  let selectedMeetups;

  $: {
    if (filter === 'all') {
      selectedMeetups = meetups;
    }
    if (filter === 'favorites') {
      selectedMeetups = meetups.filter(meetup => meetup.isFavorite);
    }
  }

  const filterMeetups = event => {
    filter = event.detail;
  };

  const showMeetupForm = () => {
    dispatch('showmeetupform');
  };
</script>

<div class="meetup-controls">
  <MeetupFilter on:filtermeetups={filterMeetups} />
  <Button on:click={showMeetupForm}>New Meetup</Button>
</div>
{#if selectedMeetups.length === 0}
  <p class="no-meetups">not meetups found, you can start adding some!!!</p>
{:else}
  <section class="meetup">
    {#each selectedMeetups as meetup (meetup.id)}
      <div
        transition:scale={{ duration: 300 }}
        animate:flip={{ duration: 300 }}
      >
        <MeetupItem {...meetup} on:showdetail on:editmeetup />
      </div>
    {/each}
  </section>
{/if}

<style>
  .meetup {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  .meetup-controls {
    display: flex;
    justify-content: space-between;
    margin: 1rem;
  }

  .no-meetups {
    background-color: lightgray;
    margin: 1rem;
    padding: 1rem 0;
    text-align: center;
  }

  @media (min-width: 768px) {
    .meetup {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
