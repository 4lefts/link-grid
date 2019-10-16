<script>
  import { links } from "./store.js";
</script>

<style>
  .admin-list {
    max-width: 960px;
    margin: 0 auto;
  }

  table {
    border-collapse: collapse;
    font-family: "Quicksand", sans-serif;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border-radius: 5px;
  }

  tr {
    border-top: 1px solid rgba(0, 0, 0, 0.3);
  }

  thead > tr {
    border-top: none;
  }

  td {
    padding: 1em;
  }

  td.color-box {
    color: white;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  }
</style>

<div class="admin-list">
  <table>
    <thead>
      <tr>
        <td>Name</td>
        <td>Address</td>
        <td>Color</td>
      </tr>
    </thead>
    <tbody>
      {#each $links as link (link.name)}
        <tr>
          <td>{link.name}</td>
          <td>{link.href}</td>
          <td class="color-box" style="background-color: {link.color};">
            {link.color}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

</div>
