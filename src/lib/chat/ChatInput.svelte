<!-- ------------------------------------------------------------
     CHATINPUT.SVELTE — FYTRUP Alpha10 (Two-Way Camera Toggle)
     Purpose:
       • Camera + send input bar
       • Emits toggleCamera → ChatWrapper handles state change
       • Icon reflects global showCamera state (passed via prop)
       • Moves cleanly above keyboard via --kb-offset
       • GH Pages safe (uses `${base}`)
------------------------------------------------------------- -->

<script>
  import { createEventDispatcher } from "svelte";
  import { base } from "$app/paths";

  export let showCamera = false;   // visual reflection of global state

  const dispatch = createEventDispatcher();
  let message = "";

  function handleSend() {
    if (message.trim().length === 0) return;
    dispatch("send", message.trim());
    message = "";
  }

  // Emit toggle upward — ChatWrapper mutates appState
  function toggleCamera() {
    dispatch("toggleCamera");
  }
</script>

<style>
  /* ------------------------------------------------------------
     INPUT CONTAINER
     ChatWrapper positions this and handles keyboard offset.
  ------------------------------------------------------------- */
  .input-wrap {
    width: 100%;
    pointer-events: none;
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
     TEXT INPUT — REM-scaled
  ------------------------------------------------------------- */
  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;

    font-size: 1rem;
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

    <!-- Camera toggle -->
    <button on:click={toggleCamera}>
      <img
        src={`${base}/icons/${showCamera ? "Camera_selected.png" : "Camera.png"}`}
        alt="camera toggle"
      />
    </button>

    <!-- Text field -->
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
