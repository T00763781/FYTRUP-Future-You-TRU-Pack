// ------------------------------------------------------------
// appState.js — FYTRUP Alpha10 Global Shell State
// Central store for:
//   • Map / Camera mode
//   • Chat messages
//   • Future persona context
//   • Future POI triggers + Worker responses
//   • UI flags (keyboard, sheets, overlays)
// ------------------------------------------------------------

import { writable } from "svelte/store";

export const appState = writable({
  // ------------------------------------------------------------
  // MODE LAYER (Map <-> Camera)
  // ------------------------------------------------------------
  showCamera: false,     // true = CameraView, false = MapView

  // ------------------------------------------------------------
  // CHAT MESSAGES
  // These are temporary until the Cloudflare Worker is wired in.
  // Format: { role: "wolfie" | "atlas" | "user" | "system", text }
  // ------------------------------------------------------------
  messages: [
    {
      role: "system",
      text: "Pack Chat mobile shell initialized."
    },
    {
      role: "wolfie",
      text: "Hey Packmate — I’ll show you around campus once chat logic is live."
    }
  ],

  // ------------------------------------------------------------
  // PERSONA STATE (Future use)
  // Will eventually route through Worker prompts.
  // ------------------------------------------------------------
  activePersona: "wolfie",  // placeholder

  // ------------------------------------------------------------
  // UI FLAGS (Future)
  // keyboardOpen: will be attached in the ChatWrapper update later
  // bottomSheetOpen: for POI sheets
  // overlayVisible: for map callouts, camera safety, etc.
  // ------------------------------------------------------------
  keyboardOpen: false,
  bottomSheetOpen: false,
  overlayVisible: false
});
