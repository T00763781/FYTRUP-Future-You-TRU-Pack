<!-- ------------------------------------------------------------
     CHATINPUT.SVELTE — FYTRUP Alpha10 (Keyboard-Aware Final)
     Purpose:
       • Camera + send input bar
       • Moves cleanly above the keyboard
       • Works with ChatWrapper --kb-offset
       • Safe-area + REM scaling
       • GH Pages compatible (base path)
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
  /* ------------------------------------------------------------
     INPUT CONTAINER
     IMPORTANT:
       - No longer fixed-position
       - ChatWrapper controls vertical position via --kb-offset
       - This component simply fills its parent
  ------------------------------------------------------------- */
  .input-wrap {
    width: 100%;
    pointer-events: none;   /* wrapper is ignored so touch passes through */
    display: flex;
    justify-content: center;
  }

  .input-bar {
    width: 92%;
    max-width: 38rem;
    pointer-events: all;

    background: var(--input-bg);
    border: 1px solid var(--input-border);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);

    border-radius: 1.75rem;
    padding: 0.6rem 0.75rem;

    display: flex;
    align-items: center;
    gap: 0.65rem;
  }

  /* ------------------------------------------------------------
     BUTTONS
  ------------------------------------------------------------- */
  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    width: 2rem;
    height: 2rem;

    flex-shrink: 0;
  }

  button img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  /* ------------------------------------------------------------
     TEXT INPUT (REM-based)
     iOS zoom prevention: ensure >=16px
  ------------------------------------------------------------- */
  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;

    font-size: 1rem;       /* ≥16px ensures iOS won’t zoom */
    color: var(--text);

    padding: 0.15rem 0;
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
      <img src={`${base}/icons/Camera.png`} alt="camera" />
    </button>

    <!-- Text Input -->
    <input
      bind:value={message}
      placeholder="Chat with the Pack…"
      on:keydown={(e) => e.key === 'Enter' && handleSend()}
    />

    <!-- Send -->
    <button on:click={handleSend}>
      <img src={`${base}/icons/send-icon.png`} alt="send" />
    </button>

  </div>
</div>
