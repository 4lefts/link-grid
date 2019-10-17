<script>
  export let link;
</script>

<style>
  .link-card {
    font-family: "Quicksand", sans-serif;
    display: block;
    height: 130px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  .link-card:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  .link-card a {
    color: white;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
    text-decoration: none;
    margin: 1em;
  }
  .link-card h2 {
    text-align: center;
  }
</style>

<div class="link-card" style="background-color: {link.color}">
  <a href={link.href} rel="noopener noreferrer" target="_blank">
    <h2>{link.name}</h2>
  </a>
</div>
