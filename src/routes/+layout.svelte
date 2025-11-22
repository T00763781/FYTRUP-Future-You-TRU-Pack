<script>
  import { onMount } from "svelte";

  export const prerender = true;

  let viewportHeight = "100vh";

  function updateViewport() {
    viewportHeight = `${window.innerHeight}px`;
    document.documentElement.style.setProperty("--app-height", viewportHeight);
  }

  onMount(() => {
    updateViewport();
    window.addEventListener("resize", updateViewport);
    window.addEventListener("orientationchange", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("orientationchange", updateViewport);
    };
  });
</script>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    height: 100%;
    overscroll-behavior: none;
    background: #000;
    color: #fff;
    -webkit-tap-highlight-color: transparent;
  }

  :root {
    --app-height: 100vh;
  }

  .app {
    width: 100%;
    height: var(--app-height);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    background: #000;
  }

  .content {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
  }

  .input-rail {
    height: 56px;
    background: rgba(20, 20, 20, 0.85);
    backdrop-filter: blur(12px);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    padding: 0 12px;
  }

  .placeholder-box {
    flex: 1;
    height: 36px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.06);
    opacity: 0.4;
  }
</style>

<div class="app">
  <div class="content">
    <slot />
  </div>

  <div class="input-rail">
    <div class="placeholder-box"></div>
  </div>
</div>