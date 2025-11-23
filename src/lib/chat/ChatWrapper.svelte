<!-- ------------------------------------------------------------
     CHATWRAPPER.SVELTE — FYTRUP Alpha10 Chat Frame (Final)
     Purpose:
       • Scrollable chat inside layer-chat
       • Floating input bar anchored inside wrapper
       • Layout-safe on all devices
       • All icons now pulled from /static/icons
------------------------------------------------------------- -->

<script>
  import { onDestroy } from "svelte";
  import ChatShell from "./ChatShell.svelte";
  import ChatInput from "./ChatInput.svelte";

  import { appState } from "$lib/state/appState.js";

  let state;
  const unsubscribe = appState.subscribe(v => (state = v));
  onDestroy(() => unsubscribe());

  function handleSend(msg) {
    appState.update(s => {
      s.messages = [...s.messages, { role: "user", text: msg }];
      return s;
    });
  }

  function handleCamera() {
    appState.update(s => {
      s.showCamera = true;
      return s;
    });
  }
</script>

<style>
  /* ------------------------------------------------------------
       CHAT WRAPPER — fills the layer-chat window
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
       SCROLL REGION
       Scrolls independently inside layer-chat
  ------------------------------------------------------------- */
  .chat-scroll {
    flex: 1;
    overflow-y: auto;

    padding: 16px 12px calc(90px + env(safe-area-inset-bottom));
    scrollbar-width: none;
  }
  .chat-scroll::-webkit-scrollbar {
    display: none;
  }

  /* Constrain message width */
  .column {
    width: 100%;
    max-width: 640px;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  /* ------------------------------------------------------------
       INPUT BAR (FLOATING)
       Sits safely above the bottom inset
  ------------------------------------------------------------- */
  .input-bar {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;

    padding-bottom: calc(env(safe-area-inset-bottom) + 8px);
  }

  .input-inner {
    width: 100%;
    max-width: 640px;
    padding: 0 12px;
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
