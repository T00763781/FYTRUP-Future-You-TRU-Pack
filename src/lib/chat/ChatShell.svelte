<!-- ------------------------------------------------------------
     CHATSHELL.SVELTE — FYTRUP Alpha10 (REM-scaled + Autoscale)
     PURPOSE:
       • Render persona messages
       • Apply REM-friendly spacing
       • Auto-scroll to last message
       • Persona avatars + names
       • GitHub Pages safe (uses `${base}`)
------------------------------------------------------------- -->

<script>
  import { onMount, afterUpdate } from "svelte";
  import Message from "./Message.svelte";
  import { base } from "$app/paths";

  export let messages = [];

  let container;  // outer scroll region

  /* ------------------------------------------------------------
     Persona Registry
     (Uses ${base} so GitHub Pages serves icons correctly)
  ------------------------------------------------------------- */
  const personas = {
    wolfie: {
      avatar: `${base}/characters/wolfie-icon-neutral.png`,
      name: "Wolfie"
    },
    atlas: {
      avatar: `${base}/characters/atlas-icon-neutral.png`,
      name: "Atlas"
    },
    system: {
      avatar: "",
      name: ""
    },
    user: {
      avatar: "",
      name: ""
    }
  };

  /* ------------------------------------------------------------
     AUTO-SCROLL (scroll to bottom on every new message)
  ------------------------------------------------------------- */
  function scrollToBottom() {
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }

  onMount(scrollToBottom);
  afterUpdate(scrollToBottom);
</script>

<!-- ------------------------------------------------------------
     RENDER
------------------------------------------------------------- -->
<div class="chat-shell" bind:this={container}>
  {#each messages as m}
    <Message
      sender={m.role}
      text={m.text}
      avatar={personas[m.role]?.avatar}
      name={personas[m.role]?.name}
    />
  {/each}
</div>

<style>
  :global(body) {
    font-family: system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* ------------------------------------------------------------
       CHAT SHELL — Full REM scaling
  ------------------------------------------------------------- */
  .chat-shell {
    width: 100%;
    max-width: 38rem;
    margin: 0 auto;

    padding: 1rem;        /* consistent with REM-ratio spacing */
    display: flex;
    flex-direction: column;
    gap: 1rem;

    overflow-y: auto;
    scrollbar-width: none;
    overscroll-behavior: contain;   /* prevents bounce during keyboard movement */
  }

  .chat-shell::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 420px) {
    .chat-shell {
      padding: 0.85rem;
      gap: 0.85rem;
    }
  }
</style>
