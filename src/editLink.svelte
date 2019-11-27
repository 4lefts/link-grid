<script>
  import { createEventDispatcher } from "svelte";
  import { slide, fade } from "svelte/transition";
  import { db } from "./firebase.js";

  import { HsvPicker } from "svelte-color-picker";
  import ConfirmDelete from "./confirmDelete.svelte";

  export let link;

  const dispatch = createEventDispatcher();

  let isEditing,
    isConfirmingDelete = false;
  $: editingStyle = isEditing
    ? `box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);`
    : ``;

  function updateColor(e) {
    // convert rgb values to hex
    let r = e.detail.r.toString(16);
    let g = e.detail.g.toString(16);
    let b = e.detail.b.toString(16);

    // pad start of single digit values
    if (r.length === 1) r = `0${r}`;
    if (g.length === 1) g = `0${g}`;
    if (b.length === 1) b = `0${b}`;

    link.color = `#${r}${g}${b}`;
  }

  function update() {
    const newData = {
      name: link.name,
      href: link.href,
      color: link.color
    };
    db.collection("links")
      .doc(link.id)
      .set(newData)
      .then(() => {
        dispatch("linkUpdated", "Link Updated!");
      })
      .catch(err => {
        console.error(err);
        dispatch("error", "Sorry, an error occured");
      });
    isEditing = false;
  }

  function confirmDelete() {
    isConfirmingDelete = true;
  }

  function deleteLink() {
    db.collection("links")
      .doc(link.id)
      .delete()
      .then(() => {
        dispatch("deleteLink", "Link Deleted!");
      })
      .catch(err => {
        console.error(err);
        dispatch("error", "Sorry, an error occured");
      });
  }
</script>

<style>
  .listing-wrapper {
    background: white;
    width: 960px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border-radius: 5px;
    padding: 1.2rem;
    margin: 0 0 1.6rem 0;
    transition: all 0.3s ease;
  }
  .listing-wrapper:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
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
  .edit-box {
    display: flex;
    flex-direction: column;
  }
  label {
    display: flex;
    flex-direction: column;
    margin: 1.8rem 0 0 0;
  }
  input {
    font-family: inherit;
    font-size: 1.6rem;
    margin-top: 0.5rem;
    padding: 1.2rem 0.7rem;
    border: 2px solid lightgrey;
    border-radius: 3px;
  }
  input:focus {
    border-color: dodgerblue;
  }

  button {
    min-width: 100px;
    margin-top: 1.8rem;
    margin-bottom: 0.6rem;
    padding: 1rem;
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
  button.delete {
    margin-left: 1rem;
    background-color: tomato;
    border-color: tomato;
  }
  button.delete:hover {
    background-color: firebrick;
    border-color: firebrick;
  }
</style>

<div in:fade={{ duration: 200 }} class="listing-wrapper" style={editingStyle}>
  <div class="listing" on:click={() => (isEditing = !isEditing)}>
    <div>
      <b>{link.name}</b>
    </div>
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
        <HsvPicker on:colorChange={updateColor} bind:startColor={link.color} />
      </label>
      <div>
        <button on:click={update}>Update</button>
        <button on:click={confirmDelete} class="delete">Delete Link</button>
      </div>
    </div>
  {/if}
</div>
{#if isConfirmingDelete}
  <ConfirmDelete
    on:closeConfirmModal={() => (isConfirmingDelete = false)}
    on:deleteLink={deleteLink} />
{/if}
