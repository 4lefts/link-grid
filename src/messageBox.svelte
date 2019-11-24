<script>
  import { fly } from "svelte/transition";
  export let message;

  const flyOptions = {
    duration: 200,
    opacity: 0.5,
    y: 400
  };
</script>

<style>
  div {
    position: fixed;
    left: 0;
    bottom: 0;
    margin: 2rem;
    min-width: 200px;
    padding: 0 2rem;
    border-radius: 5px;
    background: #111;
    color: white;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  }
  p {
    text-align: center;
    font-size: 1.8rem;
  }
</style>

<div transition:fly={flyOptions}>
  <p>{message}</p>
</div>
