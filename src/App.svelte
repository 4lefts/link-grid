<script>
  import Router from "svelte-spa-router";
  import { location } from "svelte-spa-router";
  import Logo from "./logo.svelte";
  import Linkgrid from "./linkgrid.svelte";
  import Admin from "./admin.svelte";
  import Bgcredit from "./bgcredit.svelte";

  const routes = {
    "/": Linkgrid,
    "/admin": Admin,
    "*": Linkgrid
  };
</script>

<style>
  .app {
    background-image: url("./autumn2020bg.jpg");
    min-height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    padding-bottom: 20px;
  }
  header {
    max-width: 960px;
    margin: 0 auto;
    padding: 1.3em 0 0.7em 0;
  }
  h3,
  h1 {
    font-family: "Quicksand", sans-serif;
    color: white;
    margin: 0;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
  }
  h3 {
    font-size: 1.8em;
    margin-bottom: 0.3em;
  }
  h1 {
    font-size: 2.6em;
  }
</style>

<div class="app">
  <header>
    <Logo size="80" color="white" />
    <h3>Decoy School Links {$location === '/admin' ? '(Admin Page)' : ''}</h3>
    <h1>Hello</h1>
  </header>
  <Router {routes} />
  <Bgcredit
    creditUrl={`https://unsplash.com/@aaronburden?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText`}
    photographerName={`Aaron Burden`} />
</div>
