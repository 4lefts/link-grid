<script>
  import { slide } from "svelte/transition";
  import { db } from "./firebase.js";
  export let link;

  let isEditing = false;

  function update() {
    const newData = {
      name: link.name,
      href: link.href,
      color: link.color
    };
    db.collection("links")
      .doc(link.id)
      .set(newData)
      .then(() => console.log("link updated!"))
      .catch(err => console.error(err));
  }
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

  .edit-box,
  label {
    display: flex;
    flex-direction: column;
  }
  label {
    margin: 1em 0 0 0;
  }
  input {
    font-family: inherit;
    font-size: 1.6rem;
    margin-top: 0.4em;
    padding: 0.7em 0.5em;
    border: 2px solid lightgrey;
    border-radius: 3px;
  }
  input:focus {
    border-color: dodgerblue;
  }

  button {
    width: 100px;
    margin-top: 1em;
    padding: 0.7em;
    color: white;
    font-family: inherit;
    font-size: 1.8rem;
    background-color: dodgerblue;
    border: 1px solid dodgerblue;
    border-radius: 3px;
    font-weight: 600;
    transition: all 0.3s ease;
  }
  button:hover {
    background: #135a9f;
    border-color: #135a9f;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
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
    <div transition:slide class="edit-box">
      <label>
        Name:
        <input type="text" bind:value={link.name} />
      </label>
      <label>
        Address:
        <input type="text" bind:value={link.href} />
      </label>
      <label>
        Colour:
        <input type="text" bind:value={link.color} />
      </label>
      <button on:click={update}>Update</button>
    </div>
  {/if}
</div>
