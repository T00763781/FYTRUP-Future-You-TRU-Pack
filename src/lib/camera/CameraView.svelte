<!-- ------------------------------------------------------------
     CAMERAVIEW.SVELTE — Live camera feed layer
------------------------------------------------------------- -->

<script>
  import { onMount, onDestroy } from "svelte";

  let videoEl;
  let stream = null;

  onMount(async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      if (videoEl) videoEl.srcObject = stream;
    } catch (err) {
      console.error("Camera error:", err);
    }
  });

  onDestroy(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  });
</script>

<style>
  .camera-layer {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background: black;
    z-index: 1;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

<video class="camera-layer" bind:this={videoEl} autoplay playsinline></video>
