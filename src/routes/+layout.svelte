<!-- ------------------------------------------------------------
     +LAYOUT.SVELTE — ROOT SHELL
     Controls: Splash → Fade → Chat
------------------------------------------------------------- -->

<script>
  /* -----------------------------------------
     SECTION: Imports
     PURPOSE: Load splash + chat layers
  ----------------------------------------- */
  import { onMount } from "svelte";
  import Splash from "$lib/ui/Splash.svelte";
  import Chat from "$lib/ui/Chat.svelte";   // <-- Correct path

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
  /* Fullscreen wrapper */
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
  <!-- Splash Layer -->
  <div class="fade {showSplash ? '' : 'hidden'}">
    <Splash />
  </div>

  <!-- Chat Layer -->
  {#if !showSplash}
    <Chat
      messages={[
        { role: "wolfie", text: "Pack Chat is warming up…" },
        { role: "system", text: "UI shell linked successfully." }
      ]}
    />
  {/if}
</div>
