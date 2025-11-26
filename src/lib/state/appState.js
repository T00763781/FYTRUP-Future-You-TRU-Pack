// ------------------------------------------------------------
// appState.js — FYTRUP Alpha10 Global Shell State
// Central store for:
//   • Map / Camera mode
//   • Chat messages
//   • System message injection for QR scanner
//   • Future persona context
//   • Future POI triggers + Worker responses
//   • UI flags (keyboard, sheets, overlays)
// ------------------------------------------------------------

import { writable } from "svelte/store";

export const appState = writable({
  // ------------------------------------------------------------
  // MODE LAYER (Map <-> Camera)
  // ------------------------------------------------------------
  showCamera: false, // true = CameraView, false = MapView

  // ------------------------------------------------------------
  // CHAT MESSAGES
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
  // ------------------------------------------------------------
  activePersona: "wolfie",

  // ------------------------------------------------------------
  // UI FLAGS (Future)
  // ------------------------------------------------------------
  keyboardOpen: false,
  bottomSheetOpen: false,
  overlayVisible: false
});

// ------------------------------------------------------------
// SYSTEM MESSAGE HELPERS (QR-ready)
// ------------------------------------------------------------

export function systemMessage(text) {
  appState.update((s) => {
    s.messages = [...s.messages, { role: "system", text }];
    return s;
  });
}

// ------------------------------------------------------------
// NOTE-EVENT ROUTER
// Called by: layout → handleQR(e.detail)
// ------------------------------------------------------------

export function noteEvent(type) {
  switch (type) {
    case "invalid":
      systemMessage("No valid note detected.");
      break;

    case "duplicate":
      systemMessage("Note already uploaded.");
      break;

    case "added":
      systemMessage("New note added.");
      break;

    default:
      systemMessage("Unknown scanner response.");
      break;
  }
}
