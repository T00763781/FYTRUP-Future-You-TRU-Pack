<!-- ------------------------------------------------------------
     COMPONENT: Message.svelte — FYTRUP Alpha10 (Mobile-Scaled REM)
     PURPOSE:
       • Persona avatars + persona names
       • Responsive REM-based text scaling
       • Glassmorphic TRU chat bubbles
------------------------------------------------------------- -->

<script>
  export let sender = "system";   
  export let avatar = "";         
  export let name = "";           
  export let text = "";           
</script>

<style>
  /* ------------------------------------------------------------
       PALETTE + GLASS CONSTANTS
  ------------------------------------------------------------- */
  :root {
    --bubble-bg: rgba(255,255,255,0.14);
    --bubble-bg-user: rgba(0,62,81,0.26);
    --bubble-border: rgba(255,255,255,0.22);
    --bubble-border-user: rgba(0,62,81,0.36);

    --glass-blur: blur(16px);
    --tru-blue: #003e51;
    --tru-teal: #00b0b9;
  }

  /* ------------------------------------------------------------
       ROW — left/right alignment
  ------------------------------------------------------------- */
  .row {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    margin: 0.25rem 0;
    width: 100%;
  }

  .me {
    justify-content: flex-end;
  }

  /* ------------------------------------------------------------
       AVATAR COLUMN — scaled with REM
  ------------------------------------------------------------- */
  .avatar-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 2.6rem;
    flex-shrink: 0;
    margin-top: 0.15rem;
  }

  .avatar {
    width: 1.9rem;
    height: 1.9rem;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 0.35rem rgba(0,0,0,0.25);
  }

  .name {
    margin-top: 0.25rem;
    font-size: 0.75rem;     /* 12px → REM */
    line-height: 1.1;
    opacity: 0.78;
    color: var(--text);
    text-align: center;
    max-width: 3rem;
    white-space: nowrap;
  }

  @media (max-width: 420px) {
    .avatar {
      width: 1.75rem;
      height: 1.75rem;
    }
    .name {
      font-size: 0.7rem;
    }
  }

  /* ------------------------------------------------------------
       BUBBLE — REM text scaling
  ------------------------------------------------------------- */
  .bubble {
    max-width: 80%;
    background: var(--bubble-bg);
    border: 1px solid var(--bubble-border);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);

    padding: 0.85rem 1rem;
    border-radius: 0.9rem;

    font-size: 1rem;              /* main fix */
    line-height: 1.45;
    color: white;
    word-break: break-word;
  }

  .me .bubble {
    background: var(--bubble-bg-user);
    border-color: var(--bubble-border-user);
  }

  .system {
    color: var(--tru-teal);
    font-weight: 600;
    background: rgba(255,255,255,0.10);
    border-color: rgba(255,255,255,0.22);
  }

  @media (max-width: 420px) {
    .bubble {
      font-size: 1.05rem;   /* slightly larger on small phones */
      padding: 0.9rem 1.05rem;
    }
  }
</style>

<!-- ------------------------------------------------------------
     RENDER
------------------------------------------------------------- -->
<div class="row {sender === 'user' ? 'me' : ''}">

  <!-- Persona column for non-user senders -->
  {#if sender !== 'user' && avatar}
    <div class="avatar-col">
      <img class="avatar" src={avatar} alt={sender} />
      {#if name}
        <div class="name">{name}</div>
      {/if}
    </div>
  {/if}

  <!-- Bubble -->
  <div class="bubble {sender === 'system' ? 'system' : ''}">
    {text}
  </div>

</div>
