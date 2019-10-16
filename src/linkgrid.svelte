<script>
  import Linkcard from "./linkcard.svelte";
  import { links } from "./store.js";
</script>

<style>
  .link-grid {
    max-width: 960px;
    margin: 30px auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, 200px);
    grid-gap: 1em;
    grid-auto-rows: min-content;
  }
</style>

<div class="link-grid">
  {#each $links as link (link.name)}
    <Linkcard {link} />
  {/each}
</div>
