<script>
  import { createEventDispatcher } from "svelte";
  import Modal from "./modal.svelte";
  const dispatch = createEventDispatcher();

  function closeConfirmModal() {
    dispatch("closeConfirmModal");
  }
</script>

<style>
  p {
    font-size: 1.8rem;
    font-weight: 600;
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
  button:last-child {
    margin-left: 1rem;
  }
</style>

<Modal on:closeModal={closeConfirmModal}>
  <p>Really delete this link?</p>
  <div>
    <button on:click={() => dispatch('deleteLink')}>Yes</button>
    <button on:click={closeConfirmModal} class="cancel">No</button>
  </div>
</Modal>
