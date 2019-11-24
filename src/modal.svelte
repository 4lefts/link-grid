<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  const dispatch = createEventDispatcher();

  function handleKeydown(e) {
    if (e.keyCode === 27) dispatch("closeModal");
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
</style>

<svelte:window on:keydown={handleKeydown} />

<div in:fade={{ duration: 200 }} out:fade={{ duration: 300 }} class="outer">
  <div in:fade={{ duration: 500 }} out:fade={{ duration: 100 }} class="inner">
    <slot />
  </div>
</div>
