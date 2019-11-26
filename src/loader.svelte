<script>
  const size = 200;
  const speed = 1000;
  const color = "dodgerblue";
  const thickness = 2;
  const gap = 40;
  let radius = 10;
  let dash;
  $: dash = (2 * Math.PI * radius * (100 - gap)) / 100;
</script>

<style>
  div {
    max-width: 960px;
    margin: 10px auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .svelte-spinner {
    transition-property: transform;
    animation-name: svelte-spinner_infinite-spin;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  @keyframes svelte-spinner_infinite-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

<div>
  <svg
    height={size}
    width={size}
    style="animation-duration:{speed}ms;"
    class="svelte-spinner"
    viewbox="0 0 32 32">
    <circle
      role="presentation"
      cx="16"
      cy="16"
      r={radius}
      stroke={color}
      fill="none"
      stroke-width={thickness}
      stroke-dasharray="{dash},100"
      stroke-linecap="round" />
  </svg>
</div>
