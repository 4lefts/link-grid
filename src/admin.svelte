<script>
  import { fade } from "svelte/transition";
  import { db, auth, googleProvider } from "./firebase.js";
  import SignIn from "./signIn.svelte";
  import EditLink from "./editLink.svelte";
  import AddNewLink from "./addNewLink.svelte";
  import MessageBox from "./messageBox.svelte";
  import Loader from "./loader.svelte";

  let user = null;
  let admins = ["sball@decoyschool.co.uk"];

  let isAddingNewLink,
    isShowingMessage = false;

  let message = "";

  $: links = [];

  auth.onAuthStateChanged(u => {
    user = u;
    if (user && admins.includes(user.email)) {
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
    } else if (user) {
      auth.signOut();
      showMessage("Sorry, that's not a valid admin account", 3000);
    }
  });

  function handleMessageEvent(e) {
    const msg = e.detail;
    showMessage(msg);
  }

  function showMessage(msg, dur = 1500) {
    message = msg;
    isShowingMessage = true;
    setTimeout(() => (isShowingMessage = false), dur);
  }
</script>

<style>
  .wrapper {
    position: relative;
    max-width: 960px;
    margin: 10px auto;
  }

  button {
    min-width: 100px;
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
    height: 56px;
    margin-bottom: 1.6rem;
  }
</style>

<div in:fade={{ duration: 500 }} class="wrapper">
  {#if user}
    <button
      class="new-link-button"
      on:click={() => (isAddingNewLink = !isAddingNewLink)}>
      &plus; Add New Link
    </button>
    {#if links.length}
      {#each links as link (link.id)}
        <EditLink
          {link}
          on:linkUpdated={handleMessageEvent}
          on:deleteLink={handleMessageEvent} />
      {/each}
    {:else}
      <Loader />
    {/if}
    <button on:click={() => auth.signOut()}>Sign Out</button>
  {:else}
    <SignIn />
  {/if}
</div>

{#if isAddingNewLink}
  <AddNewLink
    on:linkAdded={handleMessageEvent}
    on:closeEdit={() => (isAddingNewLink = false)} />
{/if}
{#if isShowingMessage}
  <MessageBox {message} />
{/if}
