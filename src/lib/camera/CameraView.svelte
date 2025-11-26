<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { decodeFrame } from "$lib/qr/decoder.js";

  const dispatch = createEventDispatcher();

  let videoEl;
  let containerEl;

  let stream = null;
  let rafId = null;

  // intelligent object-fit state
  let objectFit = "contain";   // dynamically updated
  let objectPosition = "center center";

  // scanning guard
  let lastPayload = null;
  let lastTime = 0;

  // Hybrid mode engine:
  // Compare camera AR vs container AR and pick best-fit strategy
  function updateFitMode() {
    if (!videoEl || !containerEl) return;

    const vw = videoEl.videoWidth;
    const vh = videoEl.videoHeight;
    if (!vw || !vh) return;

    const cw = containerEl.clientWidth;
    const ch = containerEl.clientHeight;
    if (!cw || !ch) return;

    const videoAR = vw / vh;
    const containerAR = cw / ch;

    // Intelligent hybrid rules:
    // 1. If video is WIDER than the container → contain (avoid vertical crop)
    // 2. If video is TALLER than container → cover (avoid letterboxing)
    if (videoAR > containerAR) {
      objectFit = "contain";   // preserve full frame horizontally
    } else {
      objectFit = "cover";     // maintain full-bleed experience vertically
    }
  }

  onMount(async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });

      videoEl.srcObject = stream;
      await videoEl.play();

      // update hybrid fit after metadata loads
      videoEl.onloadedmetadata = () => {
        updateFitMode();
      };

      // recalc when layout changes
      const ro = new ResizeObserver(() => updateFitMode());
      ro.observe(containerEl);

      scanLoop();
    } catch (err) {
      console.error("Camera error:", err);
    }
  });

  onDestroy(() => {
    if (rafId) cancelAnimationFrame(rafId);
    if (stream) {
      for (const t of stream.getTracks()) t.stop();
      stream = null;
    }
  });

  function scanLoop() {
    rafId = requestAnimationFrame(scanLoop);
    if (!videoEl) return;

    const txt = decodeFrame(videoEl);
    if (!txt) return;

    const now = performance.now();
    if (txt === lastPayload && now - lastTime < 2000) return;

    lastPayload = txt;
    lastTime = now;

    dispatch("qrResult", txt);
  }
</script>

<style>
  .camera-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #000;
  }

  video {
    width: 100%;
    height: 100%;
    display: block;
    background: #000;
  }
</style>

<div class="camera-container" bind:this={containerEl}>
  <video
    bind:this={videoEl}
    playsinline
    autoplay
    style="
      object-fit: {objectFit};
      object-position: {objectPosition};
    "
  ></video>
</div>