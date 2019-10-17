<script>
  import { fade } from "svelte/transition";
  import Linkcard from "./linkcard.svelte";
  import { links } from "./store.js";
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
  {#each $links as link (link.name)}
    <Linkcard {link} />
  {/each}
</div>
