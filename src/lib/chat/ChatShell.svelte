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

<style>
  /* -----------------------------------------
     SECTION: Layout
  ----------------------------------------- */
  .chat-shell {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 0.5rem 0;
    scrollbar-width: none;
  }

  .chat-shell::-webkit-scrollbar {
    display: none;
  }
</style>

<!-- -----------------------------------------
     SECTION: Render Loop
------------------------------------------ -->
<div class="chat-shell">
  {#each messages as m}
    <Message
      sender={m.role}
      text={m.text}
      avatar={avatars[m.role]}
    />
  {/each}
</div>
