<!-- ------------------------------------------------------------
     HEADER.SVELTE — TRU Brand Header (Mobile-Scaled)
     Fixes:
       • Tiny text on mobile
       • No safe-area support
       • 58px fixed height → REM adaptive height
------------------------------------------------------------- -->

<script>
  import { cycleTheme } from "$lib/theme/store.js";
</script>

<style>
  /* Root wrapper */
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;

    /* Adaptive height using REM + safe-area */
    height: calc(3.4rem + env(safe-area-inset-top));
    padding-top: env(safe-area-inset-top);

    display: flex;
    justify-content: center;
    align-items: center;

    background: var(--header-bg);
    color: var(--header-text);
    font-weight: 700;

    cursor: pointer;
    user-select: none;

    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);

    z-index: 50;
  }

  /* Brand text */
  .title {
    display: flex;
    gap: 0.35rem;

    /* Larger default text for readability */
    font-size: 1.55rem;
    line-height: 1;
  }

  /* Color-coded spans */
  .t-find  { color: var(--accent-teal); }
  .t-your  { color: var(--accent-yellow); }
  .t-tru   { color: var(--accent-green); }
  .t-path  { color: var(--accent-orange); }

  /* Mobile-first scaling */
  @media (max-width: 420px) {
    .title {
      font-size: 1.7rem;   /* bump for readability */
    }
  }
</style>

<div class="header" on:click={cycleTheme}>
  <div class="title">
    <span class="t-find">Find</span>
    <span class="t-your">Your</span>
    <span class="t-tru">TRU</span>
    <span class="t-path">Path</span>
  </div>
</div>
