<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { db } from "./firebase.js";
  import Editlisting from "./editlisting.svelte";

  const user = true;

  $: links = [];

  onMount(() => {
    const unsubscribe = db.collection("links").onSnapshot(querySnapShot => {
      const newLinks = [];
      querySnapShot.forEach(doc => {
        const newLink = {
          id: doc.id,
          ...doc.data()
        };
        newLinks.push(newLink);
      });
      links = [...newLinks];
    });
    return () => unsubscribe();
  });
</script>

<style>
  .list-wrapper {
    max-width: 960px;
    margin: 10px auto;
  }
</style>

{#if user}
  <div in:fade={{ duration: 500 }} class="list-wrapper">
    {#each links as link (link.id)}
      <Editlisting {link} />
    {/each}
  </div>
{/if}
