<script>
  import { slide } from "svelte/transition";
  export let link;

  let isEditing = false;
</script>

<style>
  .listing-wrapper {
    background: white;
    width: 960px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border-radius: 5px;
    padding: 0.7em 1em;
    margin: 0 0 10px 0;
    border: 2px solid white;
  }
  .listing {
    cursor: pointer;
    user-select: none;
    /* fallback */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }

  @supports (display: grid) {
    .listing {
      display: grid;
      grid-template-columns: 200px auto 100px;
      gap: 1em;
    }
  }

  .listing > div {
    overflow: hidden;
    white-space: nowrap;
  }

  span {
    display: inline-block;
    width: 100%;
    padding: 6px 12px;
    border-radius: 3px;
    color: white;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
    text-align: center;
  }
</style>

<div
  class="listing-wrapper"
  style={`border-color: ${isEditing ? 'dodgerblue' : 'white'}`}>
  <div class="listing" on:click={() => (isEditing = !isEditing)}>
    <div>{link.name}</div>
    <div class="href">{link.href}</div>
    <div class="color-box">
      <span style="background-color: {link.color};">{link.color}</span>
    </div>
  </div>
  {#if isEditing}
    <div transition:slide class="edit-box">Edit stuff will be here</div>
  {/if}
</div>
