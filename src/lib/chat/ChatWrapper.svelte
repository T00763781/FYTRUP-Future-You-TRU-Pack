<!-- ------------------------------------------------------------
     CHATWRAPPER.SVELTE — FYTRUP Alpha10 (Keyboard-Aware Final)
     PURPOSE:
       • Scrollable chat region below map
       • Floating input bar reacts to keyboard height
       • Uses visualViewport when available (iOS/Android)
       • REM-scaled, auto-scroll, SSR-safe
------------------------------------------------------------- -->

<script>
  import { onMount, onDestroy, afterUpdate } from "svelte";
  import ChatShell from "./ChatShell.svelte";
  import ChatInput from "./ChatInput.svelte";
  import { appState } from "$lib/state/appState.js";

  /* --------------------------------------------
     GLOBAL STATE
  -------------------------------------------- */
  let state;
  const unsubscribe = appState.subscribe((v) => (state = v));

  /* --------------------------------------------
     DOM REFS
  -------------------------------------------- */
  let wrapperEl;   // root .chat-wrapper
  let scrollEl;    // .chat-scroll

  /* --------------------------------------------
     KEYBOARD OFFSET (updated via visualViewport)
  -------------------------------------------- */
  let keyboardOffset = 0;

  /* --------------------------------------------
     AUTO-SCROLL when messages change
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
     KEYBOARD HEIGHT HANDLING (only in browser)
  -------------------------------------------- */
  function updateKeyboardOffset() {
    const vv = window.visualViewport;
    if (!vv) {
      keyboardOffset = 0;
      wrapperEl?.style.setProperty("--kb-offset", "0px");
      return;
    }

    // difference between layout viewport and visualViewport bottom
    const bottomInset = window.innerHeight - (vv.height + vv.offsetTop);

    if (bottomInset > 80) {
      keyboardOffset = bottomInset;
    } else {
      keyboardOffset = 0;
    }

    wrapperEl?.style.setProperty("--kb-offset", keyboardOffset + "px");

    requestAnimationFrame(() => {
      if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
    });
  }

  onMount(() => {
    // Attach listeners ONLY in browser
    if (typeof window !== "undefined" && window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateKeyboardOffset);
      window.visualViewport.addEventListener("scroll", updateKeyboardOffset);
      updateKeyboardOffset();
    }

    // Initial scroll once mounted
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
     MESSAGE ACTIONS
  -------------------------------------------- */
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
       WRAPPER ROOT — keyboard offset applied via CSS variable
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
       SCROLLABLE CHAT LIST — REM padding
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
       FLOATING INPUT BAR — raised by keyboard offset
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
