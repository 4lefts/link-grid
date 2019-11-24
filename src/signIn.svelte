<script>
  import { auth, googleProvider } from "./firebase.js";

  import { fade } from "svelte/transition";
  function signIn() {
    auth
      .signInWithPopup(googleProvider)
      .then()
      .catch(err => console.error(err));
  }
</script>

<style>
  div {
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border-radius: 5px;
    padding: 3.6rem;
    text-align: center;
  }
  p {
    font-size: 1.8rem;
    font-weight: 600;
  }
  button {
    width: 100%;
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
</style>

<div>
  <p>You are not signed in.</p>
  <button class="sign-in-button" on:click={signIn}>Sign In</button>
</div>
