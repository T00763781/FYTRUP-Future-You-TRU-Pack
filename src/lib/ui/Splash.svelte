<script>
  /* -----------------------------------------
     SECTION: State
     PURPOSE: Local splash visibility control
  ----------------------------------------- */
  export let show = true;
</script>

<style>
  /* -----------------------------------------
     SECTION: TRU Brand Palette
     PURPOSE: Official colour system
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
     PURPOSE: TRU-branded animated intro
  ----------------------------------------- */
  .splash {
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle at center, var(--tru-blue) 0%, var(--bg-dark) 100%);
    gap: 1rem;
    z-index: 9999;
    transition: opacity 0.7s ease;
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
  }

  .sub {
    opacity: 0.85;
  }

  .t-find  { color: var(--tru-teal); }
  .t-your  { color: var(--tru-yellow); }
  .t-tru   { color: var(--ol-green); }
  .t-path  { color: var(--tru-orange); }

  /* -----------------------------------------
     SECTION: Bar Animation
  ----------------------------------------- */
  .bar {
    width: 60%;
    height: 6px;
    background: rgba(255,255,255,0.25);
    border-radius: 4px;
    overflow: hidden;
    margin-top: 0.8rem;
  }

  .fill {
    height: 100%;
    width: 0%;
    background: white;
    animation: load 4s ease forwards;
  }

  @keyframes load { from {width:0;} to {width:100%;} }
</style>

<div class="splash {show ? '' : 'hidden'}">
  <div class="title">
    <span class="t-find">Find</span>
    <span class="t-your">Your</span>
    <span class="t-tru">TRU</span>
    <span class="t-path">Path</span>
  </div>

  <div class="sub">Loading the Pack Chat…</div>

  <div class="bar"><div class="fill"></div></div>
</div>
