<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Linkcard from "./linkcard.svelte";
  import { db } from "./firebase.js";
  $: links = [];

  onMount(() => {
    db.collection("links")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          links = [...links, doc.data()];
        });
      })
      .catch(err => console.error(err));
  });
</script>

<style>
  .link-grid {
    max-width: 960px;
    margin: 10px auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 1em;
    grid-auto-rows: min-content;
  }
</style>

<div in:fade={{ duration: 500 }} class="link-grid">
  {#each links as link (link.name)}
    <Linkcard {link} />
  {/each}
</div>
