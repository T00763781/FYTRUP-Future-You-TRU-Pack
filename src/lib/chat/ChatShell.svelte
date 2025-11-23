<!-- ------------------------------------------------------------
     CHATSHELL.SVELTE — FYTRUP Alpha10 (Persona names + base path)
     PURPOSE:
       • Render incoming chat messages
       • Correct persona avatars
       • Correct persona display names
       • Fully GitHub Pages compatible using $app/paths base prefix
------------------------------------------------------------- -->

<script>
  import Message from "./Message.svelte";
  import { base } from "$app/paths";   // <-- CRITICAL FIX for GitHub Pages

  export let messages = [];

  /* -----------------------------------------
     Persona registry (avatar + display name)
     All static assets must use `${base}/...`
  ----------------------------------------- */
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

  .chat-shell {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    overflow-y: auto;
    scrollbar-width: none;
  }
  .chat-shell::-webkit-scrollbar {
    display: none;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .bubble {
    background: rgba(255, 255, 255, 0.16);
    color: white;
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 16px;
    line-height: 1.45;
    max-width: 85%;
    word-wrap: break-word;
  }

  .system {
    align-self: center;
    background: rgba(255, 255, 255, 0.18);
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 15px;
    max-width: 90%;
  }

  .me {
    margin-left: auto;
    background: rgba(255, 255, 255, 0.28);
  }

  @media (max-width: 420px) {
    .bubble {
      font-size: 16.5px;
      padding: 12px 16px;
    }

    .avatar {
      width: 28px;
      height: 28px;
    }

    .chat-shell {
      padding: 10px;
      gap: 12px;
    }
  }
</style>
