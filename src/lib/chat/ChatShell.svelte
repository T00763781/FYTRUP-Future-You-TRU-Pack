<!-- ------------------------------------------------------------
     CHATSHELL.SVELTE — VISUAL MESSAGE LOOP
     PURPOSE: Feed messages into Message.svelte with avatars
------------------------------------------------------------- -->

<script>
  /* -----------------------------------------
     SECTION: Imports
  ----------------------------------------- */
  import Message from "./Message.svelte";

  import wolfieNeutral from "$lib/assets/characters/wolfie-icon-neutral.png";
  import atlasNeutral from "$lib/assets/characters/atlas-icon-neutral.png";

  /* -----------------------------------------
     SECTION: Props
     PURPOSE: Parent (ChatWrapper) sends messages here
  ----------------------------------------- */
  export let messages = [];

  /* -----------------------------------------
     SECTION: Avatar map
  ----------------------------------------- */
  const avatars = {
    wolfie: wolfieNeutral,
    atlas: atlasNeutral,
    system: "",
    user: ""
  };
</script>

<!-- ------------------------------------------------------------
     SECTION: Render Loop
------------------------------------------------------------- -->
<div class="chat-shell">
  {#each messages as m}
    <Message
      sender={m.role}
      text={m.text}
      avatar={avatars[m.role]}
    />
  {/each}
</div>

<style>
  /* ------------------------------------------------------------
       CHAT SHELL — MOBILE-FIRST SCALING PATCH
       Applies to: message bubbles, avatars, spacing, column width
  ------------------------------------------------------------- */

  :global(body) {
    font-family: system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* Chat container */
  .chat-shell {
    width: 100%;
    max-width: 600px;               /* mobile-safe readable column */
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

  /* Avatar dots — scaled for mobile */
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  /* Message bubble */
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

  /* System bubble (center, announcement style) */
  .system {
    align-self: center;
    background: rgba(255, 255, 255, 0.18);
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 15px;
    max-width: 90%;
  }

  /* User bubble — right aligned */
  .me {
    margin-left: auto;
    background: rgba(255, 255, 255, 0.28);
  }

  /* Mobile tightening */
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
