<script>
  import { onMount } from 'svelte';
  import { fetchData } from 'helpers/fetch.js';
  import { objectToArray } from 'helpers/objectToArray';
  import meetupsStore from 'meetups/meetupsStore.js';
  import Header from 'ui/Header.svelte';
  import MeetupGrid from 'meetups/MeetupGrid.svelte';
  import MeetupForm from 'meetups/MeetupForm.svelte';
  import MeetupDetails from 'meetups/MeetupDetails.svelte';
  import Spinner from 'ui/Spinner.svelte';
  import Error from 'ui/Error.svelte';

  let errorMessage;

  const formModes = {
    new: 'new',
    edit: 'edit',
    close: null,
  };

  let meetupFormMode = formModes.close;
  let detailId = null;
  let editMeetupId = null;
  let isLoading = false;

  const closeModal = () => {
    closeMeetupForm();
  };

  const closeMeetupForm = () => {
    meetupFormMode = formModes.close;
    editMeetupId = null;
  };

  const closeErrorModal = () => {
    errorMessage = null;
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

  onMount(() => {
    isLoading = true;
    fetchData({
      cb: ({ error, data }) => {
        if (error) {
          errorMessage = error.message;
        }
        isLoading = false;
        const meetups = objectToArray(data);
        meetupsStore.setMeetups(meetups);
      },
    });
  });
</script>

{#if errorMessage}
  <Error message={errorMessage} on:cancel={closeErrorModal} />
{/if}

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
    {#if isLoading}
      <Spinner />
    {:else}
      <MeetupGrid
        meetups={$meetupsStore}
        on:showdetail={showDetail}
        on:editmeetup={editMeetup}
        on:showmeetupform={showMeetupForm}
      />
    {/if}
  {:else}
    <MeetupDetails id={detailId} on:close={closeDetail} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
