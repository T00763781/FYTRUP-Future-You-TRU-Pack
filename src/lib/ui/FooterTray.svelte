<!-- ------------------------------------------------------------
     FOOTERTRAY.SVELTE — FYTRUP Alpha12
     PURPOSE:
       • Permanent bottom "track" for ChatInput
       • Drawer stops above this tray
       • Handles safe-area inset and elevation
       • Works on iOS Safari + Android Chrome + Desktop
------------------------------------------------------------- -->

<script>
  export let showCamera = false;

  // Events forwarded outwards to layout
  import ChatInput from "$lib/chat/ChatInput.svelte";

  function handleSend(e) {
    dispatch("send", e.detail);
  }
  function handleToggleCamera() {
    dispatch("toggleCamera");
  }

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<style>
  :global(:root) {
    --tray-height: 80px; /* fixed, predictable */
  }

  .tray-root {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    height: var(--tray-height);
    padding-bottom: env(safe-area-inset-bottom);

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 50;

    /* Background plate under ChatInput */
    background: linear-gradient(
      rgba(0, 70, 90, 0.12),
      rgba(0, 70, 90, 0.25)
    );

    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);

    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.25);
  }

  /* Inner zone keeps ChatInput centered */
  .inner {
    width: 100%;
    max-width: 40rem;
    padding: 0 0.75rem;
  }
</style>

<div class="tray-root">
  <div class="inner">
    <ChatInput
      {showCamera}
      on:send={handleSend}
      on:toggleCamera={handleToggleCamera}
    />
  </div>
</div>
