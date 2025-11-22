<!-- ------------------------------------------------------------
     CHAT WRAPPER — DEV SHELL
     PURPOSE: Bridge between layout and ChatShell.
              Provides minimal static messages to prove
              the visual chat loop + avatars work.
------------------------------------------------------------- -->

<script>
  /* -----------------------------------------
     SECTION: Imports
     PURPOSE: Wire ChatShell into this wrapper
  ----------------------------------------- */
  import ChatShell from "./ChatShell.svelte";

  /* -----------------------------------------
     SECTION: Dev Messages
     PURPOSE: Temporary seed data for visual tests.
              Roles must align with avatar map in
              ChatShell.svelte (system, user, wolfie, atlas).
  ----------------------------------------- */
  const messages = [
    {
      role: "system",
      text: "Pack Chat dev shell is live. This is a preview of how messages will sit in the layout."
    },
    {
      role: "wolfie",
      text: "Hey Packmate — I’ll handle most campus-wayfinding chat once the Cloudflare worker is wired up."
    },
    {
      role: "atlas",
      text: "I’m here for program + building flavour, but for now I’m just helping test the chat visuals."
    },
    {
      role: "user",
      text: "Got it. Just confirming the bubbles, avatars, and layout feel solid on mobile."
    }
  ];
</script>

<!-- -----------------------------------------
     SECTION: Render
     PURPOSE: Hand messages into ChatShell.
              No logic, no routing yet.
------------------------------------------ -->
<ChatShell {messages} />