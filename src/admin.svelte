<script>
  import { fade } from "svelte/transition";
  import { db, auth, googleProvider } from "./firebase.js";
  import SignIn from "./signIn.svelte";
  import EditLink from "./editLink.svelte";
  import AddNewLink from "./addNewLink.svelte";
  import MessageBox from "./messageBox.svelte";

  let user = false;

  let isAddingNewLink,
    isShowingMessage = false;

  let message = "";

  $: links = [];

  auth.onAuthStateChanged(u => {
    user = u;
    db.collection("links").onSnapshot(querySnapShot => {
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
  });

  function showMessage(e) {
    message = e.detail;
    isShowingMessage = true;
    setTimeout(() => (isShowingMessage = false), 1500);
  }
</script>

<style>
  .wrapper {
    position: relative;
    max-width: 960px;
    margin: 10px auto;
  }

  button {
    height: 56px;
    padding: 1.2rem;
    color: white;
    font-family: inherit;
    font-size: 1.8rem;
    background-color: dodgerblue;
    border: 1px solid dodgerblue;
    border-radius: 5px;
    font-weight: 600;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s ease;
  }
  button:hover {
    background: #135a9f;
    border-color: #135a9f;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  button.new-link-button {
    width: 100%;
    margin-bottom: 1.6rem;
  }
</style>

<div in:fade={{ duration: 500 }} class="wrapper">
  {#if user}
    <button
      class="new-link-button"
      on:click={() => (isAddingNewLink = !isAddingNewLink)}>
      Add New Link
    </button>
    {#if links.length}
      {#each links as link (link.id)}
        <EditLink
          {link}
          on:linkUpdated={showMessage}
          on:deleteLink={showMessage} />
      {/each}
      <button on:click={() => auth.signOut()}>Sign Out</button>
    {:else}Loading...{/if}
  {:else}
    <SignIn />
  {/if}
</div>
{#if isAddingNewLink}
  <AddNewLink
    on:linkAdded={showMessage}
    on:closeEdit={() => (isAddingNewLink = false)} />
{/if}
{#if isShowingMessage}
  <MessageBox {message} />
{/if}
