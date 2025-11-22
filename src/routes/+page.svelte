<script>
  /* -----------------------------------------
     SECTION: Imports
     PURPOSE: Splash + avatars + persona logic
  ----------------------------------------- */
  import { onMount } from "svelte";
  import Splash from "$lib/ui/Splash.svelte";

  import wolfieNeutral from "$lib/assets/characters/wolfie-icon-neutral.png";
  import atlasNeutral from "$lib/assets/characters/atlas-icon-neutral.png";

  /* -----------------------------------------
     SECTION: State
     PURPOSE: Splash timing + message store
  ----------------------------------------- */
  let showSplash = true;

  // Minimal future-proof message structure
  let messages = [
    {
      id: 1,
      role: "system",
      name: "System",
      avatar: null,
      text: "Pack Chat development mode active."
    },
    {
      id: 2,
      role: "wolfie",
      name: "Wolfie",
      avatar: wolfieNeutral,
      text: "Hey! I’m warming up the den. Things will come online soon."
    },
    {
      id: 3,
      role: "atlas",
      name: "Atlas",
      avatar: atlasNeutral,
      text: "Mapping functions are sleeping… but not for long."
    }
  ];

  /* -----------------------------------------
     SECTION: Splash Lifecycle
     PURPOSE: Fade-out after delay
  ----------------------------------------- */
  onMount(() => {
    const t = setTimeout(() => (showSplash = false), 4000);
    return () => clearTimeout(t);
  });

  /* -----------------------------------------
     SECTION: Helpers
     PURPOSE: Group consecutive messages by speaker
  ----------------------------------------- */
  function groupMessages(msgs) {
    let groups = [];
    let current = null;

    msgs.forEach((m) => {
      if (!current || current.role !== m.role) {
        current = { role: m.role, name: m.name, avatar: m.avatar, items: [] };
        groups.push(current);
      }
      current.items.push(m.text);
    });

    return groups;
  }
</script>

<style>
  /* -----------------------------------------
     SECTION: TRU Brand Palette
  ----------------------------------------- */
  :root {
    --tru-blue: #003e51;
    --tru-teal: #00b0b9;
    --tru-yellow: #ffcd00;
    --ol-green: #00b18f;
    --tru-orange: #f88f23;

    --glass-bg: rgba(255,255,255,0.08);
    --glass-stroke: rgba(255,255,255,0.18);
    --glass-blur: blur(18px);
    --text-light: #ffffff;
  }

  :global(body) {
    margin: 0;
    background: var(--tru-blue);
    color: var(--text-light);
  }

  /* -----------------------------------------
     SECTION: Page Wrapper
  ----------------------------------------- */
  .page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    box-sizing: border-box;
    gap: 1rem;
  }

  /* -----------------------------------------
     SECTION: Chat Container
     PURPOSE: Glassmorphic mobile-first panel
  ----------------------------------------- */
  .chat-container {
    flex: 1;
    background: var(--glass-bg);
    border: 1px solid var(--glass-stroke);
    border-radius: 20px;
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    display: flex;
    flex-direction: column;
    padding: 0.75rem;
    overflow-y: auto;
    gap: 1.2rem;
  }

  /* -----------------------------------------
     SECTION: Group Header
  ----------------------------------------- */
  .group-header {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 0.25rem;
  }

  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
  }

  .name {
    font-size: 0.85rem;
    opacity: 0.9;
  }

  /* -----------------------------------------
     SECTION: Bubbles
  ----------------------------------------- */
  .bubble {
    max-width: 80%;
    padding: 0.6rem 1rem;
    border-radius: 14px;
    font-size: 0.95rem;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .system { background: rgba(255,255,255,0.15); align-self: center; }
  .wolfie { background: rgba(0,176,185,0.25); align-self: flex-start; }
  .atlas  { background: rgba(0,177,143,0.25); align-self: flex-start; }
  .user   { background: rgba(255,205,0,0.25); align-self: flex-end; }
</style>

<!-- -----------------------------------------
     SECTION: Splash Layer
------------------------------------------ -->
<Splash {showSplash} />

<!-- -----------------------------------------
     SECTION: Main Page
------------------------------------------ -->
<div class="page" style="visibility:{showSplash ? 'hidden' : 'visible'}">
  <div class="chat-container">
    {#each groupMessages(messages) as group}
      <div>
        <div class="group-header">
          {#if group.avatar}
            <img class="avatar" src={group.avatar} alt={group.name} />
          {/if}
          <div class="name">{group.name}</div>
        </div>

        {#each group.items as text}
          <div class="bubble {group.role}">{text}</div>
        {/each}
      </div>
    {/each}
  </div>
</div>
