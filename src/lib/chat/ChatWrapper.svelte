<!-- ------------------------------------------------------------
     CHATWRAPPER.SVELTE — FYTRUP Alpha10 (Keyboard-Aware Final)
     PURPOSE:
       • Scrollable chat region below map
       • Floating input bar reacts to keyboard height
       • Routes toggleCamera → upward to +layout
       • Routes qrResult → upward to +layout (QR prep)
       • Does NOT modify appState itself except for send()
------------------------------------------------------------- -->

<script>
  import {
    onMount,
    onDestroy,
    afterUpdate,
    createEventDispatcher
  } from "svelte";

  import ChatShell from "./ChatShell.svelte";
  import ChatInput from "./ChatInput.svelte";
  import { appState } from "$lib/state/appState.js";

  /* --------------------------------------------
     GLOBAL STATE
  -------------------------------------------- */
  let state;
  const unsubscribe = appState.subscribe((v) => (state = v));

  /* --------------------------------------------
     DISPATCH UPSTREAM → +layout.svelte
  -------------------------------------------- */
  const dispatch = createEventDispatcher();

  // camera toggle from ChatInput → upward to layout
  function forwardToggleCamera() {
    dispatch("toggleCamera");
  }

  // QR result from CameraView → upward to layout
  function forwardQR(e) {
    dispatch("qrResult", e.detail);
  }

  /* --------------------------------------------
     DOM REFS
  -------------------------------------------- */
  let wrapperEl;   // root .chat-wrapper
  let scrollEl;    // .chat-scroll

  /* --------------------------------------------
     KEYBOARD OFFSET (via visualViewport)
  -------------------------------------------- */
  let keyboardOffset = 0;

  /* --------------------------------------------
     AUTO-SCROLL when messages update
  -------------------------------------------- */
  let lastMessageCount = 0;

  afterUpdate(() => {
    if (!scrollEl) return;

    if (state.messages?.length !== lastMessageCount) {
      lastMessageCount = state.messages.length;

      requestAnimationFrame(() => {
        scrollEl.scrollTop = scrollEl.scrollHeight;
      });
    }
  });

  /* --------------------------------------------
     KEYBOARD HEIGHT HANDLING (mobile)
  -------------------------------------------- */
  function updateKeyboardOffset() {
    const vv = window.visualViewport;
    if (!vv) {
      keyboardOffset = 0;
      wrapperEl?.style.setProperty("--kb-offset", "0px");
      return;
    }

    const bottomInset = window.innerHeight - (vv.height + vv.offsetTop);

    keyboardOffset = bottomInset > 80 ? bottomInset : 0;

    wrapperEl?.style.setProperty("--kb-offset", keyboardOffset + "px");

    requestAnimationFrame(() => {
      if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
    });
  }

  onMount(() => {
    if (typeof window !== "undefined" && window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateKeyboardOffset);
      window.visualViewport.addEventListener("scroll", updateKeyboardOffset);
      updateKeyboardOffset();
    }

    setTimeout(() => {
      if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
    }, 50);
  });

  onDestroy(() => {
    unsubscribe();
    if (typeof window !== "undefined" && window.visualViewport) {
      window.visualViewport.removeEventListener("resize", updateKeyboardOffset);
      window.visualViewport.removeEventListener("scroll", updateKeyboardOffset);
    }
  });

  /* --------------------------------------------
     SEND ACTION (appState mutation allowed)
  -------------------------------------------- */
  function handleSend(msg) {
    appState.update((s) => {
      s.messages = [...s.messages, { role: "user", text: msg }];
      return s;
    });
  }
</script>

<style>
  /* ------------------------------------------------------------
       WRAPPER ROOT — keyboard offset via CSS var
  ------------------------------------------------------------- */
  .chat-wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    --kb-offset: 0px;

    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* ------------------------------------------------------------
       SCROLLABLE CHAT LIST
  ------------------------------------------------------------- */
  .chat-scroll {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: none;

    padding: 1rem 0.75rem calc(6rem + env(safe-area-inset-bottom) + var(--kb-offset));
  }
  .chat-scroll::-webkit-scrollbar {
    display: none;
  }

  .column {
    width: 100%;
    max-width: 40rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  @media (max-width: 420px) {
    .chat-scroll {
      padding: 0.85rem 0.75rem calc(6.5rem + env(safe-area-inset-bottom) + var(--kb-offset));
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
    bottom: var(--kb-offset);
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

<div class="chat-wrapper" bind:this={wrapperEl}>

  <!-- SCROLL AREA -->
  <div class="chat-scroll" bind:this={scrollEl}>
    <div class="column">
      <ChatShell messages={state.messages} />
    </div>
  </div>

  <!-- INPUT BAR -->
  <div class="input-bar">
    <div class="input-inner">
      <ChatInput
        showCamera={state.showCamera}
        on:send={(e) => handleSend(e.detail)}
        on:toggleCamera={forwardToggleCamera}
      />
    </div>
  </div>

</div>
