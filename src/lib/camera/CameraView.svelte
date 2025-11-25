<!-- ------------------------------------------------------------
     CAMERAVIEW.SVELTE — FYTRUP Alpha10 (Safe Frame + QR Prep)
     Purpose:
       • Camera fits inside .layer-map only (42vh window)
       • Safe start/stop lifecycle
       • QR scan hook (dispatches qrResult upward)
       • SSR safe, GH Pages safe
------------------------------------------------------------- -->

<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";

  let videoEl;
  let stream = null;

  // Upstream dispatcher → ChatWrapper → +layout → noteEvent()
  const dispatch = createEventDispatcher();

  // ------------------------------------------------------------
  // Placeholder scan loop (no real decoding yet)
  // This will later call: dispatch("qrResult", "added" | "invalid" | ...)
  // ------------------------------------------------------------
  let scanning = false;

  async function startScanLoop() {
    if (!videoEl) return;
    scanning = true;

    // Future: plug in jsQR / ZXing decoding here
    while (scanning) {
      // --------------------------------------------------------
      // Placeholder: simulate no detection
      // Later replaced with:
      //   const frame = getImageDataFrom(videoEl)
      //   const result = jsQR(...)
      //   if (result) dispatch("qrResult", classify(result.data))
      // --------------------------------------------------------

      await new Promise(r => setTimeout(r, 300)); // gentle polling
    }
  }

  // ------------------------------------------------------------
  // CAMERA START
  // ------------------------------------------------------------
  onMount(async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });

      if (videoEl) {
        videoEl.srcObject = stream;
        await videoEl.play();
      }

      // Start scan loop (stub)
      startScanLoop();

    } catch (err) {
      console.error("Camera error:", err);
      dispatch("qrResult", "invalid");  // fallback system message
    }
  });

  // ------------------------------------------------------------
  // CAMERA STOP
  // ------------------------------------------------------------
  onDestroy(() => {
    scanning = false;

    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  });
</script>

<style>
  /* IMPORTANT:
     This must match the geometry of .layer-map,
     not fullscreen.
  */

  .camera-frame {
    width: 100%;
    height: 100%;
    background: black;
    overflow: hidden;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

<div class="camera-frame">
  <video bind:this={videoEl} autoplay playsinline></video>
</div>
