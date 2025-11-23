<!-- ------------------------------------------------------------
     COMPONENT: Message.svelte — FYTRUP Alpha10 (Patched)
     PURPOSE:
       • Unified bubble renderer
       • Persona avatars + persona names under avatar
       • Mobile-scaled, glassmorphic
------------------------------------------------------------- -->

<script>
  export let sender = "system";    // system | user | wolfie | atlas | ...
  export let avatar = "";          // path from ChatShell
  export let name = "";            // NEW — persona name shown under avatar
  export let text = "";            // message body
</script>

<style>
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

  /* ROW — left/right alignment */
  .row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin: 4px 0;
    width: 100%;
  }
  .me {
    justify-content: flex-end;
  }

  /* AVATAR COLUMN */
  .avatar-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 42px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 6px rgba(0,0,0,0.25);
  }

  .name {
    margin-top: 4px;
    font-size: 12px;
    line-height: 1.1;
    opacity: 0.78;
    color: var(--text);
    text-align: center;
    max-width: 48px;
    white-space: nowrap;
  }

  @media (max-width: 420px) {
    .avatar { width: 28px; height: 28px; }
    .name { font-size: 11px; }
  }

  /* BUBBLE */
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
      font-size: 16.5px;
      padding: 13px 16px;
    }
  }
</style>

<!-- ------------------------------------------------------------
     RENDER
------------------------------------------------------------- -->

<div class="row {sender === 'user' ? 'me' : ''}">

  <!-- Persona column only for non-user senders -->
  {#if sender !== 'user' && avatar}
    <div class="avatar-col">
      <img class="avatar" src={avatar} alt={sender} />
      {#if name}
        <div class="name">{name}</div>
      {/if}
    </div>
  {/if}

  <div class="bubble {sender === 'system' ? 'system' : ''}">
    {text}
  </div>

</div>
