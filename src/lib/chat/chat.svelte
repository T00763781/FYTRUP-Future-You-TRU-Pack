<script>
  /* -----------------------------------------
     SECTION: Purpose
     PURPOSE: Minimal static chat shell UI.
              No logic, no personas, no routing.
              Paves the way for Operation 4 steps.
  ----------------------------------------- */

  export let messages = [];
</script>

<style>
  /* -----------------------------------------
     SECTION: Layout
     PURPOSE: Visual container for early chat tests
  ----------------------------------------- */
  .chat-shell {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  /* -----------------------------------------
     SECTION: Message Bubbles (Temporary)
     PURPOSE: Placeholder visuals until persona rules land
  ----------------------------------------- */
  .bubble {
    max-width: 80%;
    padding: 0.7rem 1rem;
    border-radius: 16px;
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(12px);
    color: white;
    font-size: 0.95rem;
  }

  .system {
    align-self: flex-start;
    border: 1px solid rgba(255,255,255,0.15);
  }

  .user {
    align-self: flex-end;
    background: rgba(255,255,255,0.18);
  }
</style>

<div class="chat-shell">
  {#each messages as m}
    <div class="bubble {m.role}">
      {m.text}
    </div>
  {/each}
</div>