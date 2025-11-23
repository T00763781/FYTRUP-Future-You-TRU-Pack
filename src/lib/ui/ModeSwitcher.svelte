<!-- ------------------------------------------------------------
     MODESWITCHER.SVELTE — FYTRUP Alpha10 (Final)
     Purpose:
       • Toggle MapView ↔ CameraView
       • Fully SSR-safe via onMount-loaded components
       • GH Pages compatible
       • Minimal footprint (layout owns frame)
------------------------------------------------------------- -->

<script>
  import { onMount } from "svelte";

  export let showCamera = false;

  /* Lazy-loaded component handles */
  let MapView = null;
  let CameraView = null;

  let loaded = false;

  onMount(async () => {
    // Dynamic imports only run in browser — SSR safe
    const mapMod = await import("$lib/map/MapView.svelte");
    const camMod = await import("$lib/camera/CameraView.svelte");

    MapView = mapMod.default;
    CameraView = camMod.default;

    loaded = true;
  });
</script>

<!-- ------------------------------------------------------------
     RENDER
     If components not yet loaded → placeholder shell
------------------------------------------------------------- -->

{#if !loaded}
  <div class="loading-shell">Loading…</div>
{:else}
  {#if showCamera}
    <CameraView />
  {:else}
    <MapView />
  {/if}
{/if}

<style>
  /* The parent layout defines the map/camera window.
     This only ensures safe-area won't clip content if future
     devices introduce new viewport insets. */

  .loading-shell {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1rem;
    opacity: 0.65;
    color: var(--text);
  }

  :global(.layer-map) {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
