<script>
  import meetupsStore from 'meetups/meetupsStore.js';
  import Header from 'ui/Header.svelte';
  import MeetupGrid from 'meetups/MeetupGrid.svelte';
  import MeetupForm from 'meetups/MeetupForm.svelte';
  import MeetupDetails from 'meetups/MeetupDetails.svelte';

  const formModes = {
    new: 'new',
    edit: 'edit',
    close: null,
  };

  let meetupFormMode = formModes.close;
  let detailId = null;
  let editMeetupId = null;

  const closeModal = () => {
    closeMeetupForm();
  };

  const closeMeetupForm = () => {
    meetupFormMode = formModes.close;
    editMeetupId = null;
  };

  const showMeetupForm = () => {
    meetupFormMode = formModes.new;
  };

  const showDetail = event => {
    detailId = event.detail;
  };

  const closeDetail = () => {
    detailId = null;
  };

  const editMeetup = event => {
    meetupFormMode = formModes.edit;
    editMeetupId = event.detail;
  };
</script>

<Header />
<main>
  {#if detailId === null}
    {#if meetupFormMode === formModes.new || meetupFormMode === formModes.edit}
      <MeetupForm
        id={editMeetupId}
        on:closemodal={closeModal}
        on:cancelmodal={closeMeetupForm}
      />
    {/if}
    <MeetupGrid
      meetups={$meetupsStore}
      on:showdetail={showDetail}
      on:editmeetup={editMeetup}
      on:showmeetupform={showMeetupForm}
    />
  {:else}
    <MeetupDetails id={detailId} on:close={closeDetail} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
