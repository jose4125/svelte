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
<section class="meetup">
  {#each selectedMeetups as meetup (meetup.id)}
    <div transition:scale={{ duration: 3000 }} animate:flip={{ duration: 300 }}>
      <MeetupItem {...meetup} on:showdetail on:editmeetup />
    </div>
  {/each}
</section>

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

  @media (min-width: 768px) {
    .meetup {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
