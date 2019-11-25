<script>
  import { createEventDispatcher } from "svelte";
  import { db } from "./firebase.js";
  import { HsvPicker } from "svelte-color-picker";
  import Modal from "./modal.svelte";
  const dispatch = createEventDispatcher();

  let newLink = {
    name: "",
    href: "",
    color: "#000000"
  };

  function updateColor(e) {
    // convert rgb values to hex
    let r = e.detail.r.toString(16);
    let g = e.detail.g.toString(16);
    let b = e.detail.b.toString(16);

    // pad start of single digit values
    if (r.length === 1) r = `0${r}`;
    if (g.length === 1) g = `0${g}`;
    if (b.length === 1) b = `0${b}`;

    console.log(`#${r}${g}${b}`);
  }

  function closeEdit() {
    dispatch("closeEdit");
  }

  function submit() {
    db.collection("links")
      .add(newLink)
      .then(docRef => {
        dispatch("linkAdded", "Link Added!");
      })
      .catch(err => {
        console.error(err);
        dispatch("error", "Sorry, an error occured");
      });
    newLink = {
      name: "",
      href: "",
      color: ""
    };
    closeEdit();
  }
</script>

<style>
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

<Modal on:closeModal={closeEdit}>
  <h2>Add a new link:</h2>
  <label>
    Name:
    <input type="text" bind:value={newLink.name} />
  </label>
  <label>
    Address:
    <input type="text" bind:value={newLink.href} />
  </label>
  <label>
    Colour:
    <input type="text" bind:value={newLink.color} />
  </label>
  <label>
    Colour:
    <HsvPicker on:colorChange={updateColor} bind:startColor={newLink.color} />
  </label>
  <div>
    <button on:click={submit}>Submit</button>
    <button on:click={closeEdit} class="cancel">Cancel</button>
  </div>
</Modal>
