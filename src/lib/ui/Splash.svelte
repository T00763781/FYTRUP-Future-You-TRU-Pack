<!-- ------------------------------------------------------------
     SPLASH.SVELTE — TRU BRANDED INTRO
     Mobile-scaled, safe-area-aware, production-ready
------------------------------------------------------------- -->

<script>
  /* Parent controls show/hide */
  export let show = true;
</script>

<style>
  /* -----------------------------------------
     SECTION: TRU Brand Palette
  ----------------------------------------- */
  :root {
    --tru-blue: #003e51;
    --bg-dark: #001d28;
    --tru-teal: #00b0b9;
    --tru-yellow: #ffcd00;
    --ol-green: #00b18f;
    --tru-orange: #f88f23;
  }

  /* -----------------------------------------
     SECTION: Splash Container
     Safe-area aware + mobile-first scaling
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
      var(--bg-dark) 100%
    );

    gap: 1.2rem;
    z-index: 9999;
    transition: opacity 0.7s ease;

    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);

    /* Prevent layout jump under mobile chrome */
    height: 100vh;
    width: 100%;
  }

  .hidden {
    opacity: 0;
    pointer-events: none;
  }

  /* -----------------------------------------
     SECTION: Typography
  ----------------------------------------- */
  .title {
    font-size: 2.4rem;
    font-weight: 700;
    display: flex;
    gap: 0.35rem;
    text-align: center;
    line-height: 1.1;
  }

  .sub {
    opacity: 0.9;
    font-size: 1.05rem;
    text-align: center;
  }

  .t-find  { color: var(--tru-teal); }
  .t-your  { color: var(--tru-yellow); }
  .t-tru   { color: var(--ol-green); }
  .t-path  { color: var(--tru-orange); }

  /* -----------------------------------------
     SECTION: Bar Animation
  ----------------------------------------- */
  .bar {
    width: 70%;
    max-width: 320px;
    height: 6px;
    background: rgba(255,255,255,0.25);
    border-radius: 4px;
    overflow: hidden;
    margin-top: 0.6rem;
  }

  .fill {
    height: 100%;
    width: 0%;
    background: white;
    animation: load 2.8s ease forwards;
  }

  @keyframes load {
    from { width: 0%; }
    to   { width: 100%; }
  }

  /* -----------------------------------------
     MOBILE SIZE TUNING
  ----------------------------------------- */
  @media (max-width: 420px) {
    .title {
      font-size: 1.9rem;
    }
    .sub {
      font-size: 0.95rem;
    }
    .bar {
      height: 5px;
      width: 75%;
    }
  }
</style>

<div class="splash {show ? '' : 'hidden'}">
  <div class="title">
    <span class="t-find">Find</span>
    <span class="t-your">Your</span>
    <span class="t-tru">TRU</span>
    <span class="t-path">Path</span>
  </div>

  <div class="sub">Loading the Pack Chat…</div>

  <div class="bar">
    <div class="fill"></div>
  </div>
</div>
