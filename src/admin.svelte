<script>
  import { fade } from "svelte/transition";
  import { links } from "./store.js";
  import Editlisting from "./editlisting.svelte";

  const user = true;
</script>

<style>
  .list-wrapper {
    max-width: 960px;
    margin: 10px auto;
  }
</style>

{#if user}
  <div in:fade={{ duration: 500 }} class="list-wrapper">
    {#each $links as link (link.name)}
      <Editlisting {link} />
    {/each}
  </div>
{/if}
