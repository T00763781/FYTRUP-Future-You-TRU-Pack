<!-- ------------------------------------------------------------
     CHAT WRAPPER — DEV SHELL (MOBILE-SCALED)
     PURPOSE: Bridge between layout and ChatShell.
              Applies mobile-safe column + safe-area padding.
------------------------------------------------------------- -->

<script>
  import ChatShell from "./ChatShell.svelte";

  /* ------------------------------------------------------------
       TEMPORARY DEV MESSAGES
       (proves bubble loop, avatars, and layout)
  ------------------------------------------------------------- */
  const messages = [
    {
      role: "system",
      text: "Pack Chat dev shell is live. This preview shows spacing, avatars, and bubble rendering."
    },
    {
      role: "wolfie",
      text: "Hey Packmate — I’ll take point on campus-navigation once the Cloudflare worker is wired up."
    },
    {
      role: "atlas",
      text: "I’m here for academic/building flavour. For now I’m just helping test chat visuals."
    },
    {
      role: "user",
      text: "Perfect. Mobile readability looks way better now."
    }
  ];
</script>

<!-- ------------------------------------------------------------
     MOBILE-SAFE WRAPPER
     Positions ChatShell inside a centered, padded column.
------------------------------------------------------------- -->
<style>
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    /* Safe-area aware */
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);

    overflow: hidden;
  }

  .column {
    width: 100%;
    max-width: 620px;
    height: 100%;
    padding: 0 12px; /* matched to ChatShell spacing */
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 420px) {
    .column {
      max-width: 92%;
      padding: 0 10px;
    }
  }
</style>

<!-- ------------------------------------------------------------
     RENDER
------------------------------------------------------------- -->
<div class="wrapper">
  <div class="column">
    <ChatShell {messages} />
  </div>
</div>
