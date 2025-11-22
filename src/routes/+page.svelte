----------- FILE: src/routes/+page.svelte (BEGIN) -----------
<script>
  import { onMount } from "svelte";

  let showSplash = true;
  let fade = false;

  onMount(() => {
    // Start fade at 2.2s, remove splash at 3s
    setTimeout(() => (fade = true), 2200);
    setTimeout(() => (showSplash = false), 3000);
  });
</script>

<style>
  .splash-container {
    position: absolute;
    inset: 0;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.7s ease;
  }

  .fade {
    opacity: 0;
  }

  .logo {
    font-size: 2.4rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: white;
    opacity: 0.9;
    user-select: none;
  }

  .page {
    width: 100%;
    height: 100%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    box-sizing: border-box;
    text-align: center;
  }
</style>

{#if showSplash}
  <div class="splash-container" class:fade={fade}>
    <div class="logo">FYTRUP</div>
  </div>
{/if}

<div class="page">
  <div>
    <p>Alpha-10 scaffold is running.</p>
    <p>This content will be replaced when chat and map layers land.</p>
  </div>
</div>
----------- FILE: src/routes/+page.svelte (END) -----------
