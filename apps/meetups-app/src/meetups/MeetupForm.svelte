<script>
  import { createEventDispatcher } from 'svelte';
  import { isEmpty, isValidEmail } from 'helpers/validation.js';
  import { fetchData } from 'helpers/fetch.js';
  import meetupsStore from 'meetups/meetupsStore.js';

  import Field from 'ui/Field.svelte';
  import Button from 'ui/Button.svelte';
  import Modal from 'ui/Modal.svelte';

  export let id = null;

  let title = '';
  let subtitle = '';
  let address = '';
  let imageUrl = '';
  let contactEmail = '';
  let description = '';

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: addressValid = !isEmpty(address);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: contactEmailValid = !isEmpty(contactEmail) && isValidEmail(contactEmail);
  $: descriptionValid = !isEmpty(description);
  $: isValidForm =
    titleValid &&
    subtitleValid &&
    addressValid &&
    imageUrlValid &&
    contactEmailValid &&
    descriptionValid;

  if (id) {
    const unsubscribe = meetupsStore.subscribe(currentMeetups => {
      const editMeetup = currentMeetups.find(meetup => meetup.id === id);
      title = editMeetup.title;
      subtitle = editMeetup.subtitle;
      address = editMeetup.address;
      imageUrl = editMeetup.imageUrl;
      contactEmail = editMeetup.contactEmail;
      description = editMeetup.description;
    });

    unsubscribe();
  }

  const dispatch = createEventDispatcher();

  const submitForm = () => {
    const meetup = {
      title,
      subtitle,
      address,
      imageUrl,
      contactEmail,
      description,
    };

    if (!id) {
      fetchData({
        data: { ...meetup, isFavorite: false },
        method: 'POST',
        cb: ({ data }) => {
          console.log('=== data', data);
          meetupsStore.addMeetup({
            ...meetup,
            id: data.name,
            isFavorite: false,
          });
        },
      });
    }

    if (id) {
      fetchData({
        data: meetup,
        method: 'PATCH',
        id,
        cb: ({ data, id }) => {
          meetupsStore.updateMeetup(id, data);
        },
      });
    }

    dispatch('closemodal');
  };

  const cancelForm = () => {
    dispatch('cancelmodal');
  };

  const deleteMeetup = () => {
    fetchData({
      method: 'DELETE',
      id,
      cb: ({ id }) => {
        meetupsStore.deleteMeetup(id);
      },
    });
    dispatch('closemodal');
  };
</script>

<Modal title="Test title" on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <Field
      id="title"
      label="Title"
      value={title}
      valid={titleValid}
      errorMessage="Please enter a valid title"
      on:input={event => (title = event.target.value)}
    />
    <Field
      id="subtitle"
      label="Subtitle"
      value={subtitle}
      valid={subtitleValid}
      errorMessage="Please enter a valid subtitle"
      on:input={event => (subtitle = event.target.value)}
    />
    <Field
      id="address"
      label="Address"
      value={address}
      valid={addressValid}
      errorMessage="Please enter a valid address"
      on:input={event => (address = event.target.value)}
    />
    <Field
      id="imageurl"
      label="Image URL"
      value={imageUrl}
      valid={imageUrlValid}
      errorMessage="Please enter a valid image url"
      on:input={event => (imageUrl = event.target.value)}
    />
    <Field
      type="email"
      id="email"
      label="Email"
      value={contactEmail}
      valid={contactEmailValid}
      errorMessage="Please enter a valid email"
      on:input={event => (contactEmail = event.target.value)}
    />
    <Field
      type="textarea"
      id="description"
      cols="30"
      rows="10"
      label="Description"
      value={description}
      valid={descriptionValid}
      errorMessage="Please enter a valid description"
      on:input={event => (description = event.target.value)}
    />
  </form>
  <div slot="footer">
    <Button type="button" on:click={submitForm} disabled={!isValidForm}>
      Save
    </Button>
    <Button type="button" mode="outline" on:click={cancelForm}>Cancel</Button>
    {#if id}
      <Button type="button" mode="outline" on:click={deleteMeetup}
        >Delete
      </Button>
    {/if}
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
