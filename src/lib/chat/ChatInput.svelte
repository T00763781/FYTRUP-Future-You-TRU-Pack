<!-- ------------------------------------------------------------
     CHATINPUT.SVELTE — FYTRUP Alpha10 (Final REM + GH Pages)
     Floating message input bar
     • Camera + send actions
     • Safe-area aware
     • Theme-driven
     • Uses base path for GitHub Pages compatibility
------------------------------------------------------------- -->

<script>
  import { createEventDispatcher } from "svelte";
  import { base } from "$app/paths";

  const dispatch = createEventDispatcher();
  let message = "";

  function handleSend() {
    if (message.trim().length === 0) return;
    dispatch("send", message.trim());
    message = "";
  }

  function openCamera() {
    dispatch("camera");
  }
</script>

<style>
  .input-wrap {
    position: fixed;
    bottom: calc(env(safe-area-inset-bottom) + 0.9rem);
    left: 0;
    width: 100%;

    display: flex;
    justify-content: center;
    z-index: 99;

    pointer-events: none;
  }

  .input-bar {
    width: 92%;
    max-width: 38rem; /* ~608px */

    background: var(--input-bg);
    border: 1px solid var(--input-border);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);

    border-radius: 1.75rem;
    padding: 0.6rem 0.75rem;

    display: flex;
    align-items: center;
    gap: 0.65rem;

    pointer-events: all;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    width: 2rem;
    height: 2rem;
  }

  button img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;

    font-size: 1rem;
    color: var(--text);
  }

  @media (max-width: 420px) {
    .input-bar {
      width: 94%;
      padding: 0.75rem 0.9rem;
    }

    input {
      font-size: 1.05rem;
    }
  }
</style>

<div class="input-wrap">
  <div class="input-bar">

    <!-- Camera -->
    <button on:click={openCamera}>
      <img src={base + "/icons/Camera.png"} alt="camera" />
    </button>

    <!-- Input -->
    <input
      bind:value={message}
      placeholder="Chat with the Pack…"
      on:keydown={(e) => e.key === 'Enter' && handleSend()}
    />

    <!-- Send -->
    <button on:click={handleSend}>
      <img src={base + "/icons/send-icon.png"} alt="send" />
    </button>

  </div>
</div>
