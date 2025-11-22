<!-- ------------------------------------------------------------
     COMPONENT: Message.svelte
     PURPOSE: Unified bubble renderer for Pack Chat
     Future-proof for persona states and Worker routing
------------------------------------------------------------- -->

<script>
  export let sender = "system";   // system | user | wolfie | atlas | ...
  export let avatar = "";
  export let text = "";
</script>

<style>
  :root {
    --bubble-bg: rgba(255,255,255,0.10);
    --bubble-border: rgba(255,255,255,0.18);
    --glass-blur: blur(14px);

    --tru-blue: #003e51;
    --tru-teal: #00b0b9;
    --tru-yellow: #ffcd00;
  }

  .row {
    display: flex;
    gap: 0.45rem;
    margin: 0.45rem 0.75rem;
    align-items: flex-start;
  }

  .me {
    justify-content: flex-end;
  }

  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    box-shadow: 0 0 6px rgba(0,0,0,0.25);
  }

  .bubble {
    max-width: 75%;
    padding: 0.65rem 0.9rem;
    border-radius: 14px;
    background: var(--bubble-bg);
    border: 1px solid var(--bubble-border);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    color: white;
    font-size: 0.95rem;
    line-height: 1.3rem;
    word-break: break-word;
  }

  /* System colouring */
  .system {
    color: var(--tru-teal);
    font-weight: 600;
  }

  /* User bubble override */
  .me .bubble {
    background: rgba(0,62,81,0.25);
    border-color: rgba(0,62,81,0.32);
  }
</style>

<div class="row {sender === 'user' ? 'me' : ''}">
  {#if sender !== 'user' && avatar}
    <img class="avatar" src={avatar} alt={sender} />
  {/if}

  <div class="bubble {sender === 'system' ? 'system' : ''}">
    {text}
  </div>
</div>
