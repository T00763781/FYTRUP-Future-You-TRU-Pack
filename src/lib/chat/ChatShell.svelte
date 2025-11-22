------------------------------------------------------------
FILE: src/lib/chat/ChatShell.svelte
------------------------------------------------------------

<script>
  /* -----------------------------------------
     SECTION: Purpose
     PURPOSE: Provide message-loop container
              used by ChatWrapper.
              This file is the missing link
              causing GitHub Pages to fail.
  ----------------------------------------- */

  export let messages = [];
</script>

<style>
  /* -----------------------------------------
     SECTION: Layout
     PURPOSE: Minimal vertical stack for bubbles
  ----------------------------------------- */
  .shell {
    width: 100%;
    height: 100%;
    padding: 0.75rem 0;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    gap: 0.5rem;
  }
</style>

<div class="shell">
  {#each messages as m}
    <Message
      sender={m.role}
      text={m.text}
      avatar={avatars[m.role]}
    />
  {/each}
</div>

<!-- -----------------------------------------
     SECTION: Dependencies
     PURPOSE: Connect to Message.svelte + avatars
------------------------------------------ -->
<script>
  import Message from "./Message.svelte";

  import wolfieNeutral from "$lib/assets/characters/wolfie-icon-neutral.png";
  import atlasNeutral from "$lib/assets/characters/atlas-icon-neutral.png";

  const avatars = {
    wolfie: wolfieNeutral,
    atlas: atlasNeutral,
    system: "",
    user: ""
  };
</script>
