<script>
  import Router from "svelte-spa-router";
  import { location } from "svelte-spa-router";
  import Logo from "./logo.svelte";
  import Linkgrid from "./linkgrid.svelte";
  import Admin from "./admin.svelte";

  const routes = {
    "/": Linkgrid,
    "/admin": Admin,
    "*": Linkgrid,
  };

  let bgImgUrl = "https://source.unsplash.com/yuiJO6bvHi4/1280x720";
</script>

<div class="app" style="background-image: url({bgImgUrl})">
  <header>
    <Logo size="80" color="white" />
    <h1>Decoy School Links {$location === "/admin" ? "(Admin Page)" : ""}</h1>
  </header>
  <Router {routes} />
</div>

<style>
  .app {
    background-color: #1d1d1d;
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
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  h1 {
    font-family: "Quicksand", sans-serif;
    color: white;
    margin: 0;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
    font-size: 2.2em;
  }
</style>
