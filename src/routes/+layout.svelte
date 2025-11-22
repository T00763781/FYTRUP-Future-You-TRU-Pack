<!-- ------------------------------------------------------------
     +LAYOUT.SVELTE — ROOT SHELL
     Controls: Splash → Fade → Chat (via ChatWrapper)
------------------------------------------------------------- -->

<script>
  import { onMount } from "svelte";
  import Splash from "$lib/ui/Splash.svelte";

  /* Correct + tree-verified import */
  import ChatWrapper from "$lib/chat/ChatWrapper.svelte";

  let showSplash = true;

  onMount(() => {
    setTimeout(() => {
      showSplash = false;
    }, 2500);
  });
</script>

<style>
  .root {
    width: 100%;
    height: 100vh;
    background: #003e51;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .fade {
    transition: opacity 0.6s ease;
  }

  .hidden {
    opacity: 0;
    pointer-events: none;
  }
</style>

<div class="root">
  <div class="fade {showSplash ? '' : 'hidden'}">
    <Splash />
  </div>

  {#if !showSplash}
    <ChatWrapper />
  {/if}
</div>
