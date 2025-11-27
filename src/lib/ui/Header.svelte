<!-- ------------------------------------------------------------
     HEADER.SVELTE — TRU Brand Header + Contacts Button (LEFT)
------------------------------------------------------------- -->

<script>
  import { createEventDispatcher } from "svelte";
  import { cycleTheme } from "$lib/theme/store.js";

  const dispatch = createEventDispatcher();

  function openContacts() {
    dispatch("toggleContacts");
  }
</script>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;

    height: calc(3.4rem + env(safe-area-inset-top));
    padding-top: env(safe-area-inset-top);

    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--header-bg);
    color: var(--header-text);
    font-weight: 700;

    user-select: none;

    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);

    z-index: 50;
  }

  .inner {
    width: 100%;
    max-width: 44rem;
    padding: 0 0.75rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* Brand title */
  .title {
    display: flex;
    gap: 0.35rem;
    font-size: 1.55rem;
    line-height: 1;
    cursor: pointer;

    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: auto;
  }

  .t-find  { color: var(--accent-teal); }
  .t-your  { color: var(--accent-yellow); }
  .t-tru   { color: var(--accent-green); }
  .t-path  { color: var(--accent-orange); }

  /* Left contacts button */
  .contacts-btn {
    width: 34px;
    height: 34px;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(255,255,255,0.12);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    cursor: pointer;
    transition: background 0.15s ease;
    z-index: 10;

    overflow: hidden;      /* trims any PNG padding */
  }

  .contacts-btn:hover {
    background: rgba(255,255,255,0.20);
  }

  /* ICON FIX — clean, edge-to-edge, no shadow, proper sizing */
  .contacts-btn img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;

    display: block;
    padding: 0;
    margin: 0;
    opacity: 1;
    filter: none;
  }

  @media (max-width: 420px) {
    .title {
      font-size: 1.7rem;
    }
    .contacts-btn {
      width: 36px;
      height: 36px;
    }
    .contacts-btn img {
      width: 100%;
      height: 100%;
    }
  }
</style>

<div class="header">
  <div class="inner">

    <!-- LEFT CONTACTS BUTTON -->
    <div class="contacts-btn" on:click={openContacts}>
      <img src="/icons/contacts.png" alt="Contacts" />
    </div>

    <!-- TRUE-CENTERED TITLE -->
    <div class="title" on:click={cycleTheme}>
      <span class="t-find">Find</span>
      <span class="t-your">Your</span>
      <span class="t-tru">TRU</span>
      <span class="t-path">Path</span>
    </div>

    <!-- RIGHT SPACER (keeps symmetry) -->
    <div style="width:34px;"></div>

  </div>
</div>
