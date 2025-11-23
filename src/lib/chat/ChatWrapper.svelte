<!-- ------------------------------------------------------------
     CHATWRAPPER.SVELTE — FYTRUP Alpha10 Chat Frame (Patched)
     Purpose:
       • Scrollable chat inside layer-chat region
       • Flexible height under map window
       • Floating input bar fixed at bottom of layer-chat
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
  /* Outer wrapper simply fills layer-chat */
  .chat-wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    overflow: hidden;
  }

  /* Scroll region — flex:1 inside wrapper */
  .chat-scroll {
    flex: 1;
    overflow-y: auto;

    padding: 16px 12px 80px; /* room for input bar */
    scrollbar-width: none;
  }
  .chat-scroll::-webkit-scrollbar {
    display: none;
  }

  /* constrain message width */
  .column {
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  /* Floating input bar at bottom of wrapper */
  .input-bar {
    position: absolute;
    bottom: 0;
    width: 100%;

    display: flex;
    justify-content: center;

    padding: 0 12px 8px;
  }

  .input-inner {
    width: 100%;
    max-width: 640px;
  }
</style>

<div class="chat-wrapper">

  <!-- SCROLLING MESSAGE COLUMN -->
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
