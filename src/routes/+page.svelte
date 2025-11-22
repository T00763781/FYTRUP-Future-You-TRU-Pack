<script>
  /* -----------------------------------------
     SECTION: Imports
     PURPOSE: Keep splash logic self-contained
  ----------------------------------------- */
  import { onMount } from "svelte";

  /* -----------------------------------------
     SECTION: State
     PURPOSE: Splash visibility / timing
  ----------------------------------------- */
  let showSplash = true;

  /* -----------------------------------------
     SECTION: Lifecycle
     PURPOSE: Time the splash fade-out
  ----------------------------------------- */
  onMount(() => {
    const t = setTimeout(() => (showSplash = false), 4000);
    return () => clearTimeout(t);
  });
</script>

<style>
  /* -----------------------------------------
     SECTION: TRU Brand Palette
     PURPOSE: Official colour system
  ----------------------------------------- */
  :root {
    --tru-blue: #003e51;
    --tru-teal: #00b0b9;
    --tru-sage: #bad1ba;
    --tru-grey: #9ab7c1;
    --tru-yellow: #ffcd00;
    --tru-cloud: #fff5de;
    --ol-green: #00b18f;
    --tru-orange: #f88f23;

    --bg: var(--tru-blue);  /* Dominant background */
    --glass-bg: rgba(255, 255, 255, 0.08);
    --glass-stroke: rgba(255, 255, 255, 0.18);
    --glass-blur: blur(18px);
    --text-light: #ffffff;
    --font-ui: "Roboto", sans-serif;
  }

  :global(html),
  :global(body) {
    margin: 0;
    background: var(--bg);
    font-family: var(--font-ui);
    color: var(--text-light);
    height: 100%;
  }

  /* -----------------------------------------
     SECTION: Splash Screen
     PURPOSE: TRU-branded animated intro
  ----------------------------------------- */
  .splash {
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: radial-gradient(
      circle at center,
      var(--tru-blue) 0%,
      #001d28 100%
    );

    gap: 1rem;
    z-index: 9999;
    transition: opacity 0.7s ease;
  }
  .splash.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .splash-title {
    font-size: 2.4rem;
    font-weight: 700;
    display: flex;
    gap: 0.35rem;
    animation: fadeUp 0.6s ease forwards;
  }

  .splash-sub {
    opacity: 0.85;
    animation: fadeUp 1.0s ease forwards;
  }

  .splash-bar {
    width: 60%;
    height: 6px;
    background: rgba(255,255,255,0.25);
    border-radius: 4px;
    overflow: hidden;
    margin-top: 0.8rem;
  }
  .splash-bar-fill {
    height: 100%;
    width: 0%;
    background: white;
    animation: splashLoad 4s ease forwards;
  }

  @keyframes splashLoad { from { width:0; } to { width:100%; } }
  @keyframes fadeUp { from {opacity:0; transform:translateY(6px);} to {opacity:1; transform:translateY(0);} }

  .t-find  { color: var(--tru-teal); }
  .t-your  { color: var(--tru-yellow); }
  .t-tru   { color: var(--ol-green); }
  .t-path  { color: var(--tru-orange); }

  /* -----------------------------------------
     SECTION: Glassmorphic Landing Page
     PURPOSE: Polished dev-state scaffold
  ----------------------------------------- */
  .page {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.2rem;
    box-sizing: border-box;
    text-align: center;
  }

  .glass-card {
    width: 100%;
    max-width: 520px;

    padding: 2.2rem 1.8rem;
    border-radius: 24px;

    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: 1px solid var(--glass-stroke);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.1rem;

    box-shadow: 0 12px 40px rgba(0,0,0,0.35);
    animation: fadeIn 0.8s ease forwards;
    opacity: 0;
  }

  @keyframes fadeIn {
    from { opacity:0; transform:translateY(10px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .headline {
    font-size: 2.2rem;
    font-weight: 700;
    display: flex;
    gap: 0.35rem;
    justify-content: center;
    flex-wrap: wrap;
    line-height: 1.15;
  }

  .dev-line {
    font-size: 1.1rem;
    opacity: 0.9;
  }
</style>

<!-- -----------------------------------------
     SECTION: Splash Template
     PURPOSE: Fully-branded TRU intro
------------------------------------------ -->
<div class="splash {showSplash ? '' : 'hidden'}">
  <div class="splash-title">
    <span class="t-find">Find</span>
    <span class="t-your">Your</span>
    <span class="t-tru">TRU</span>
    <span class="t-path">Path</span>
  </div>

  <div class="splash-sub">Loading the Pack Chat…</div>

  <div class="splash-bar">
    <div class="splash-bar-fill"></div>
  </div>
</div>

<!-- -----------------------------------------
     SECTION: Main Landing (dev mode)
     PURPOSE: Glassmorphic interim UI
------------------------------------------ -->
<div class="page" style="visibility:{showSplash ? 'hidden' : 'visible'}">
  <div class="glass-card">
    <div class="headline">
      <span class="t-find">Find</span>
      <span class="t-your">Your</span>
      <span class="t-tru">TRU</span>
      <span class="t-path">Path</span>
    </div>

    <div class="dev-line">
      Pack Chat is stretching its paws—features waking up soon.
    </div>
  </div>
</div>