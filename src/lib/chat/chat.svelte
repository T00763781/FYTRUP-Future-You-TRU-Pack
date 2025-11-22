<!-- ------------------------------------------------------------
     COMPONENT: Chat.svelte
     PURPOSE: Renders the full Pack Chat message stream
              using the unified Message bubble component.
              Future-proof for persona logic + Worker routing.
------------------------------------------------------------- -->

<script>
  /* -----------------------------------------
     SECTION: Imports
     PURPOSE: Message renderer + avatar registry
  ----------------------------------------- */
  import { messages } from "./store.js";
  import Message from "./Message.svelte";

  /* -----------------------------------------
     SECTION: Avatar Map
     PURPOSE: Neutral persona icons (default state)
  ----------------------------------------- */
  import wolfieNeutral from "$lib/assets/characters/wolfie-icon-neutral.png";
  import atlasNeutral from "$lib/assets/characters/atlas-icon-neutral.png";

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
     PURPOSE: Vertical scroll region for messages
  ----------------------------------------- */
  .chat-stream {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 0.25rem 0;
    gap: 0.25rem;
  }
</style>

<!-- -----------------------------------------
     SECTION: Message Loop
     PURPOSE: Each message goes through bubble renderer
------------------------------------------ -->
<div class="chat-stream">
  {#each $messages as m}
    <Message
      sender={m.role}
      text={m.text}
      avatar={avatars[m.role]}
    />
  {/each}
</div>