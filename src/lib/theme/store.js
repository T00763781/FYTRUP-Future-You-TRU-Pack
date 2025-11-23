/* ------------------------------------------------------------
   STORE.JS — FYTRUP Alpha10 Theme Engine
------------------------------------------------------------- */

import { writable } from "svelte/store";

const themes = ["tru", "night", "sunset"];

export const theme = writable("tru");

/* Apply theme to <html data-theme=""> */
function applyTheme(name) {
  if (typeof document === "undefined") return;  // SSR guard
  document.documentElement.setAttribute("data-theme", name);
}

/* Initialize theme on client */
export function initTheme() {
  const saved = typeof localStorage !== "undefined"
    ? localStorage.getItem("fytrup-theme")
    : null;

  const initial = saved || "tru";

  theme.set(initial);
  applyTheme(initial);

  // reactively update DOM when theme changes
  theme.subscribe((t) => {
    applyTheme(t);
  });
}

/* Cycle through themes */
export function cycleTheme() {
  theme.update((current) => {
    const idx = themes.indexOf(current);
    const next = themes[(idx + 1) % themes.length];

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("fytrup-theme", next);
    }

    applyTheme(next);
    return next;
  });
}
