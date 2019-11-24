<script>
  import { createEventDispatcher } from "svelte";
  import { db } from "./firebase.js";
  import { fade } from "svelte/transition";
  const dispatch = createEventDispatcher();

  let newLink = {
    name: "",
    href: "",
    color: ""
  };

  function handleKeydown(e) {
    if (e.keyCode === 27) closeEdit();
  }

  function closeEdit() {
    dispatch("closeEdit");
  }

  function submit() {
    db.collection("links")
      .add(newLink)
      .then(docRef => console.log("link added!"))
      .catch(err => console.error(err));
    newLink = {
      name: "",
      href: "",
      color: ""
    };
    closeEdit();
  }
</script>

<style>
  .outer {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.7);
  }
  .inner {
    max-width: 960px;
    background: white;
    padding: 4rem 2rem;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
  }
  h2 {
    margin: 0;
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
    width: 480px;
    border: 2px solid lightgrey;
    border-radius: 3px;
  }
  input:focus {
    border-color: dodgerblue;
  }

  button {
    width: 100px;
    margin-top: 1em;
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
  button.cancel {
    margin-left: 1rem;
    background-color: tomato;
    border-color: tomato;
  }
  button.cancel:hover {
    background-color: firebrick;
    border-color: firebrick;
  }
</style>

<svelte:window on:keydown={handleKeydown} />

<div in:fade={{ duration: 200 }} out:fade={{ duration: 300 }} class="outer">
  <div in:fade={{ duration: 500 }} out:fade={{ duration: 100 }} class="inner">
    <h2>Add a new link:</h2>
    <label>
      Name:
      <input type="text" bind:value={newLink.name} autofocus />
    </label>
    <label>
      Address:
      <input type="text" bind:value={newLink.href} />
    </label>
    <label>
      Colour:
      <input type="text" bind:value={newLink.color} />
    </label>
    <div>
      <button on:click={submit}>Submit</button>
      <button on:click={closeEdit} class="cancel">Cancel</button>
    </div>
  </div>
</div>
