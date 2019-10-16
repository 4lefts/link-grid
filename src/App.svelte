<script>
  import Router from "svelte-spa-router";
  import { location } from "svelte-spa-router";
  import Logo from "./logo.svelte";
  import Linkgrid from "./linkgrid.svelte";
  import Admin from "./admin.svelte";
  import Bgcredit from "./bgcredit.svelte";

  const routes = {
    "/": Linkgrid,
    "/admin": Admin
  };
</script>

<style>
  .app {
    background-image: url("./autumnbg.jpg");
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
  header {
    max-width: 960px;
    margin: 0 auto;
    padding: 1.3em 0 0.7em 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h3,
  h1 {
    font-family: "Quicksand", sans-serif;
    color: white;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    margin: 0;
  }
  h3 {
    font-size: 2em;
    margin-bottom: 0.1em;
  }
  h1 {
    font-size: 3em;
  }
</style>

<div class="app">
  <header>
    <Logo size="100" color="white" />
    <h3>Decoy School Useful Links {$location === '/admin' ? '(admin)' : ''}</h3>
    <h1>Hello</h1>
  </header>
  <Router {routes} />
  <Bgcredit />
</div>
