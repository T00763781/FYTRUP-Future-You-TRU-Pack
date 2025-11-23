<!-- ------------------------------------------------------------
     CHATSHELL.SVELTE — FYTRUP Alpha10 (REM-scaled final)
     PURPOSE:
       • Render incoming chat messages
       • Persona avatars + names
       • REM-based scaling for mobile readability
       • Uses `${base}` for GitHub Pages compatibility
------------------------------------------------------------- -->

<script>
  import Message from "./Message.svelte";
  import { base } from "$app/paths";

  export let messages = [];

  /* Persona registry */
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
</script>

<!-- ------------------------------------------------------------
     RENDER LOOP
------------------------------------------------------------- -->
<div class="chat-shell">
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
       CHAT SHELL (REM-scaled)
  ------------------------------------------------------------- */
  .chat-shell {
    width: 100%;
    max-width: 38rem;        /* ~600px */
    margin: 0 auto;

    padding: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    overflow-y: auto;
    scrollbar-width: none;
  }

  .chat-shell::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 420px) {
    .chat-shell {
      padding: 0.75rem;
      gap: 0.85rem;
    }
  }
</style>
