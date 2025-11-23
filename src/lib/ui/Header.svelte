<!-- ------------------------------------------------------------
     HEADER.SVELTE — TRU Brand Header with Theme Cycle
------------------------------------------------------------- -->

<script>
  import { cycleTheme } from "$lib/theme/store.js";
</script>

<style>
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 58px;

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

  .title {
    display: flex;
    gap: 0.35rem;
    font-size: 1.45rem;
  }

  .t-find  { color: var(--accent-teal); }
  .t-your  { color: var(--accent-yellow); }
  .t-tru   { color: var(--accent-green); }
  .t-path  { color: var(--accent-orange); }
</style>

<div class="header" on:click={cycleTheme}>
  <div class="title">
    <span class="t-find">Find</span>
    <span class="t-your">Your</span>
    <span class="t-tru">TRU</span>
    <span class="t-path">Path</span>
  </div>
</div>
