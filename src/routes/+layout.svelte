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

<!-- ------------------------------------------------------------
     MOBILE-FIRST ROOT LAYOUT
     Applies a consistent padded, centered viewport for all devices
------------------------------------------------------------- -->
<style>
  .root {
    width: 100%;
    height: 100vh;
    background: #003e51;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    /* Avoid layout jump under mobile browser chrome */
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }

  .fade {
    transition: opacity 0.6s ease;
  }

  .hidden {
    opacity: 0;
    pointer-events: none;
  }

  /* Chat/Splash column wrapper */
  .column {
    width: 100%;
    max-width: 620px;     /* readable chat width */
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Mobile tightening */
  @media (max-width: 420px) {
    .column {
      max-width: 92%;
    }
  }
</style>

<!-- ------------------------------------------------------------
     UI LAYERS
------------------------------------------------------------- -->
<div class="root">

  <!-- SPLASH -->
  <div class="column fade {showSplash ? '' : 'hidden'}">
    <Splash />
  </div>

  <!-- CHAT -->
  {#if !showSplash}
    <div class="column">
      <ChatWrapper />
    </div>
  {/if}

</div>
