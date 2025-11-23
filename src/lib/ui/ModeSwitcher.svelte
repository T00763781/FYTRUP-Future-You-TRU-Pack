<!-- ------------------------------------------------------------
     MODESWITCHER.SVELTE — Map/Camera swapper
------------------------------------------------------------- -->

<script>
  import MapView from "$lib/map/MapView.svelte";
  import CameraView from "$lib/camera/CameraView.svelte";

  export let showCamera = false;
</script>

{#if showCamera}
  <CameraView />
{:else}
  <MapView />
{/if}
