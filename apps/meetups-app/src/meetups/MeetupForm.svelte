<script>
  import { createEventDispatcher } from 'svelte';
  import { isEmpty, isValidEmail } from 'helpers/validation.js';

  import Field from 'ui/Field.svelte';
  import Button from 'ui/Button.svelte';
  import Modal from 'ui/Modal.svelte';

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

  const dispatch = createEventDispatcher();

  const submitForm = () => {
    dispatch('addmeetup', {
      title,
      subtitle,
      address,
      imageUrl,
      contactEmail,
      description,
    });
  };

  const cancelForm = () => {
    dispatch('cancel');
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
    <Button type="button" on:click={submitForm} disabled={!isValidForm}
      >Save</Button
    >
    <Button type="button" mode="outline" on:click={cancelForm}>Cancel</Button>
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
