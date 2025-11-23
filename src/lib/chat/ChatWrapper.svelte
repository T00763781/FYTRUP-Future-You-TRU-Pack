<!-- ------------------------------------------------------------
     CHATWRAPPER.SVELTE — FYTRUP Alpha10 (REM-Scaled Final)
     PURPOSE:
       • Scrollable chat region below map
       • Floating input bar anchored inside wrapper
       • Full REM scaling for mobile readability
       • Layout-safe for iOS/Android safe-area insets
------------------------------------------------------------- -->

<script>
  import { onDestroy } from "svelte";
  import ChatShell from "./ChatShell.svelte";
  import ChatInput from "./ChatInput.svelte";
  import { appState } from "$lib/state/appState.js";

  let state;
  const unsubscribe = appState.subscribe((v) => (state = v));
  onDestroy(() => unsubscribe());

  function handleSend(msg) {
    appState.update((s) => {
      s.messages = [...s.messages, { role: "user", text: msg }];
      return s;
    });
  }

  function handleCamera() {
    appState.update((s) => {
      s.showCamera = true;
      return s;
    });
  }
</script>

<style>
  /* ------------------------------------------------------------
       WRAPPER — full height under layer-chat
  ------------------------------------------------------------- */
  .chat-wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    overflow: hidden;
  }

  /* ------------------------------------------------------------
       SCROLL REGION (REM spacing)
  ------------------------------------------------------------- */
  .chat-scroll {
    flex: 1;
    overflow-y: auto;

    padding: 1rem 0.75rem calc(6rem + env(safe-area-inset-bottom));
    scrollbar-width: none;
  }
  .chat-scroll::-webkit-scrollbar {
    display: none;
  }

  .column {
    width: 100%;
    max-width: 40rem;     /* ~640px */
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  @media (max-width: 420px) {
    .chat-scroll {
      padding: 0.85rem 0.75rem calc(6.5rem + env(safe-area-inset-bottom));
    }
    .column {
      gap: 0.75rem;
    }
  }

  /* ------------------------------------------------------------
       FLOATING INPUT BAR
  ------------------------------------------------------------- */
  .input-bar {
    position: absolute;
    bottom: 0;
    width: 100%;

    display: flex;
    justify-content: center;

    padding-bottom: calc(env(safe-area-inset-bottom) + 0.5rem);
  }

  .input-inner {
    width: 100%;
    max-width: 40rem;
    padding: 0 0.75rem;
  }
</style>

<div class="chat-wrapper">

  <!-- SCROLL AREA -->
  <div class="chat-scroll">
    <div class="column">
      <ChatShell messages={state.messages} />
    </div>
  </div>

  <!-- FLOATING INPUT BAR -->
  <div class="input-bar">
    <div class="input-inner">
      <ChatInput
        on:send={(e) => handleSend(e.detail)}
        on:camera={handleCamera}
      />
    </div>
  </div>

</div>
