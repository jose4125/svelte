<script>
  import Header from 'ui/Header.svelte';
  import Button from 'ui/Button.svelte';
  import MeetupGrid from 'meetups/MeetupGrid.svelte';
  import MeetupForm from 'meetups/MeetupForm.svelte';

  const formModes = {
    new: 'new',
    edit: 'edit',
    close: null,
  };

  let meetupFormMode = formModes.close;
  let meetups = [
    {
      id: 'm1',
      title: 'Coding Bootcamp',
      subtitle: 'Learn to code in 2 hours',
      description:
        'In this meetup, we will have some experts that teach you how to code!',
      imageUrl: '',
      address: '27th Nerd Road, 32523 New York',
      contactEmail: 'jose@example.com',
      isFavorite: false,
    },
    {
      id: 'm2',
      title: 'Swim Together',
      subtitle: "Let's go for some swimming",
      description: 'We will simple swim some rounds!',
      imageUrl: '',
      address: '27th Nerd Road, 32523 New York',
      contactEmail: 'swim@example.com',
      isFavorite: false,
    },
  ];

  const addMeetup = event => {
    const { title, subtitle, description, imageUrl, address, contactEmail } =
      event.detail;
    const newMeetup = {
      id: Date.now().toString(),
      title,
      subtitle,
      address,
      imageUrl,
      contactEmail,
      description,
      isFavorite: false,
    };

    meetups = [newMeetup, ...meetups];
    closeMeetupForm();
  };

  const closeMeetupForm = event => {
    meetupFormMode = formModes.close;
  };

  const togglefavorite = event => {
    const id = event.detail;
    const meetupToUpdate = { ...meetups.find(meetup => meetup.id == id) };
    meetupToUpdate.isFavorite = !meetupToUpdate.isFavorite;
    const meetupToUpdateIndex = meetups.findIndex(meetup => meetup.id == id);
    const cloneMeetups = [...meetups];
    cloneMeetups[meetupToUpdateIndex] = meetupToUpdate;
    meetups = cloneMeetups;
  };

  const showMeetupForm = () => {
    meetupFormMode = formModes.new;
  };
</script>

<Header />
<main>
  <div class="meetup-controls">
    <Button on:click={showMeetupForm}>New Meetup</Button>
  </div>
  {#if meetupFormMode == formModes.new}
    <MeetupForm on:addmeetup={addMeetup} on:cancel={closeMeetupForm} />
  {/if}
  <MeetupGrid {meetups} on:togglefavorite={togglefavorite} />
</main>

<style>
  main {
    margin-top: 5rem;
  }
  .meetup-controls {
    margin: 1rem;
  }
</style>
