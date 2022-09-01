<script>
  import ContactCard from './ContactCard.svelte';
  import Bindings from './Bindings.svelte';
  import EventForwarding from './EventForwarding.svelte';
  import Modal from './Modal.svelte';

  let name = 'Max';
  let title = '';
  let image = '';
  let description = '';
  let password = '';
  let passwordValidity = '';
  let formState = 'empty';
  let createdContacts = [];
  let storedPasswords = [];

  let showModal = false;
  let closeable = false;

  $: {
    if (password.length > 0 && password.length < 5) {
      passwordValidity = 'short';
    }

    if (password.length > 10) {
      passwordValidity = 'long';
    }

    if (password.length >= 5 && password.length <= 10) {
      passwordValidity = 'valid';
    }
  }

  const addContact = () => {
    if (
      !name.trim().length ||
      !title.trim().length ||
      !image.trim().length ||
      !description.trim().length
    ) {
      formState = 'invalid';
      return;
    }
    formState = 'done';
    const newContact = {
      id: Date.now(),
      name,
      title,
      image,
      description,
    };

    createdContacts = [...createdContacts, newContact];
  };

  const deleteFirst = () => {
    createdContacts = createdContacts.slice(1);
  };
  const deleteLast = () => {
    createdContacts = createdContacts.slice(0, -1);
  };

  const addPassword = () => {
    storedPasswords = [...storedPasswords, password];
    password = '';
  };

  const removePassword = password => {
    storedPasswords = storedPasswords.filter(
      storedPassword => storedPassword !== password,
    );
  };

  const closeModal = () => (showModal = false);
  const cancelModal = () => (showModal = false);
</script>

<form id="form">
  <div class="form-control">
    <label for="userName">User Name</label>
    <input type="text" bind:value={name} id="userName" />
  </div>
  <div class="form-control">
    <label for="jobTitle">Job Title</label>
    <input type="text" bind:value={title} id="jobTitle" />
  </div>
  <div class="form-control">
    <label for="image">Image URL</label>
    <input type="text" bind:value={image} id="image" />
  </div>
  <div class="form-control">
    <label for="desc">Description</label>
    <textarea rows="3" bind:value={description} id="desc" />
  </div>
  <div class="form-control">
    <label for="password">Password</label>
    <input type="password" bind:value={password} id="password" />
  </div>
  {#if passwordValidity === 'short'}
    <p>Too Short</p>
  {/if}
  {#if passwordValidity === 'long'}
    <p>Too Long</p>
  {/if}
  {#if passwordValidity === 'valid'}
    <button on:click={addPassword}>Add Password</button>
    <p>{password}</p>
  {/if}
  <ul>
    {#each storedPasswords as password (password)}
      <li on:click={() => removePassword(password)}>{password}</li>
    {/each}
  </ul>
  <button on:click|preventDefault={addContact}>Add Contact</button>
</form>

<button on:click={deleteFirst}>Delete first</button>
<button on:click={deleteLast}>Delete last</button>

{#if formState === 'invalid'}
  <p>Please fill out all fields.</p>
{/if}

{#each createdContacts as { name, title, image, description, id }, index (id)}
  <h2>#{index + 1}</h2>
  <ContactCard
    userName={name}
    jobTitle={title}
    userImage={image}
    {description}
  />
{:else}
  <p>Please start adding some contacts, we found none</p>
{/each}

<EventForwarding />
<br />
<br />
<button on:click={() => (showModal = true)}>Show Modal</button>
{#if showModal}
  <Modal on:cancel={cancelModal} on:close={closeModal} let:didAgree={closeable}>
    <h1 slot="header">hello</h1>
    <p>content</p>
    <button slot="footer" on:click={closeModal} disabled={!closeable}
      >Confirm</button
    >
  </Modal>
{/if}

<h1>Bindings</h1>
<Bindings />

<style>
  #form {
    width: 30rem;
    max-width: 100%;
    margin: 1rem 0;
  }
</style>
