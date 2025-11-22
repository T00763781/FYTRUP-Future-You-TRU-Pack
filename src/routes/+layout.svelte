<!-- ------------------------------------------------------------
     +LAYOUT.SVELTE — ROOT SHELL
     Controls: Splash → Fade → ChatWrapper
------------------------------------------------------------- -->

<script>
  /* -----------------------------------------
     SECTION: Imports
     PURPOSE: Load splash + chat layers
  ----------------------------------------- */
  import { onMount } from "svelte";
  import Splash from "$lib/ui/Splash.svelte";

  // FIXED — correct file, correct case, correct folder
  import ChatWrapper from "$lib/chat/ChatWrapper.svelte";

  /* -----------------------------------------
     SECTION: State
     PURPOSE: Toggle splash → chat transition
  ----------------------------------------- */
  let showSplash = true;

  /* -----------------------------------------
     SECTION: Lifecycle
     PURPOSE: Fade-out timer for the splash
  ----------------------------------------- */
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

<!-- ------------------------------------------------------------
     UI LAYERS
------------------------------------------------------------- -->
<div class="root">
  <div class="fade {showSplash ? '' : 'hidden'}">
    <Splash />
  </div>

  {#if !showSplash}
    <ChatWrapper />
  {/if}
</div>
