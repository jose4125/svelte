<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/Button.svelte';
  import Badge from 'ui/Badge.svelte';

  export let id,
    title,
    subtitle,
    description,
    imageUrl,
    address,
    contactEmail,
    isFavorite;

  const dispatch = createEventDispatcher();

  $: favoriteButtonText = isFavorite ? 'Unfavorite' : 'Favorite';
  $: buttonColor = isFavorite ? null : 'success';
</script>

<article class="meetup-item">
  <header>
    <h1 class:meetup-item__header--favorite={isFavorite}>
      {title}
      {#if isFavorite}
        <Badge>FAVORITE</Badge>
      {/if}
    </h1>
    <h2>{subtitle}</h2>
    <p>{address}</p>
  </header>
  <div>
    <img class="meetup-item__image" src={imageUrl} alt="" />
  </div>
  <div class="meetup-item__content">
    <p class="meetup-item__description">{description}</p>
  </div>
  <footer>
    <Button href="mailto:{contactEmail}">contact</Button>
    <Button
      mode="outline"
      color={buttonColor}
      on:click={() => {
        dispatch('togglefavorite', id);
      }}>{favoriteButtonText}</Button
    >
    <Button>Show Details</Button>
  </footer>
</article>

<style>
  .meetup-item {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .meetup-item__content,
  footer {
    padding: 1rem;
  }

  .meetup-item__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: 'Roboto Slab', sans-serif;
  }

  h1.meetup-item__header--favorite {
    background: #01a129;
    color: white;
    padding: 0 0.5rem;
    border-radius: 5px;
  }

  h2 {
    font-size: 1rem;
    font-weight: normal;
    color: #808080;
    margin: 0.5rem 0;
  }

  .meetup-item__description {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }
</style>
