<!-- ------------------------------------------------------------
     COMPONENT: Message.svelte
     PURPOSE: Unified, mobile-scaled bubble renderer for Pack Chat
     Future-proof for persona states + Worker routing
------------------------------------------------------------- -->

<script>
  export let sender = "system";   // system | user | wolfie | atlas | ...
  export let avatar = "";
  export let text = "";
</script>

<style>
  /* ------------------------------------------------------------
       ROOT VARIABLES — TRU palette + bubble system
  ------------------------------------------------------------- */
  :root {
    --bubble-bg: rgba(255,255,255,0.14);
    --bubble-bg-user: rgba(0,62,81,0.26);
    --bubble-border: rgba(255,255,255,0.22);
    --bubble-border-user: rgba(0,62,81,0.36);

    --glass-blur: blur(16px);

    --tru-blue: #003e51;
    --tru-teal: #00b0b9;
    --tru-yellow: #ffcd00;
  }

  /* ------------------------------------------------------------
       ROW LAYOUT
  ------------------------------------------------------------- */
  .row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin: 2px 0;
    width: 100%;
  }

  /* User bubbles push right */
  .me {
    justify-content: flex-end;
  }

  /* ------------------------------------------------------------
       AVATAR — scaled for mobile
  ------------------------------------------------------------- */
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    box-shadow: 0 0 6px rgba(0,0,0,0.25);
    margin-top: 2px;
  }

  @media (max-width: 420px) {
    .avatar {
      width: 28px;
      height: 28px;
    }
  }

  /* ------------------------------------------------------------
       BUBBLE — glassmorphic mobile baseline
  ------------------------------------------------------------- */
  .bubble {
    max-width: 80%;
    background: var(--bubble-bg);
    border: 1px solid var(--bubble-border);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);

    padding: 12px 15px;
    border-radius: 14px;

    font-size: 16px;
    line-height: 1.45;
    color: white;

    word-break: break-word;
  }

  /* User bubble override */
  .me .bubble {
    background: var(--bubble-bg-user);
    border-color: var(--bubble-border-user);
  }

  /* System bubble — distinct TRU/teal accent */
  .system {
    color: var(--tru-teal);
    font-weight: 600;
    background: rgba(255,255,255,0.10);
    border-color: rgba(255,255,255,0.22);
  }

  @media (max-width: 420px) {
    .bubble {
      font-size: 16.5px;
      padding: 13px 16px;
    }
  }
</style>

<!-- ------------------------------------------------------------
       RENDER
------------------------------------------------------------- -->
<div class="row {sender === 'user' ? 'me' : ''}">
  {#if sender !== 'user' && avatar}
    <img class="avatar" src={avatar} alt={sender} />
  {/if}

  <div class="bubble {sender === 'system' ? 'system' : ''}">
    {text}
  </div>
</div>
