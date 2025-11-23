<!-- ------------------------------------------------------------
     CHATINPUT.SVELTE — Floating Message Input Bar
     Purpose: Camera button → message field → send button
     Behaviour: Floats above safe-area, theme-aware, mobile-first
------------------------------------------------------------- -->

<script>
  import { createEventDispatcher } from "svelte";

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
    bottom: calc(env(safe-area-inset-bottom) + 14px);
    left: 0;
    width: 100%;

    display: flex;
    justify-content: center;
    z-index: 99;

    pointer-events: none; /* wrapper ignored */
  }

  .input-bar {
    width: 92%;
    max-width: 620px;

    background: var(--input-bg);
    border: 1px solid var(--input-border);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);

    border-radius: 28px;
    padding: 8px 12px;

    display: flex;
    align-items: center;
    gap: 10px;

    pointer-events: all; /* bar is interactive */
  }

  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    width: 32px;
    height: 32px;
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

    font-size: 16px;
    color: var(--text);
  }

  @media (max-width: 420px) {
    .input-bar {
      width: 94%;
      padding: 10px 14px;
    }
    input {
      font-size: 16.5px;
    }
  }
</style>

<div class="input-wrap">
  <div class="input-bar">

    <button on:click={openCamera}>
      <img src="/icons/Camera.png" alt="camera" />
    </button>

    <input
      bind:value={message}
      placeholder="Chat with the Pack…"
      on:keydown={(e) => e.key === 'Enter' && handleSend()}
    />

    <button on:click={handleSend}>
      <img src="/icons/send-icon.png" alt="send" />
    </button>
  </div>
</div>
