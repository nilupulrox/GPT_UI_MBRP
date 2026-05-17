<template>
  <q-layout view="lHh Lpr lFf">
    <!-- ─── Header ─────────────────────────────────────────────────────── -->
    <q-header elevated class="glass-header">
      <q-toolbar style="min-height: 56px; padding: 0 12px;">
        <!-- Inline SVG Logo -->
        <div class="row items-center q-ml-sm logo-svg-wrap">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style="animation: logoGlow 3s ease-in-out infinite;">
            <circle cx="19" cy="19" r="17" stroke="url(#ringGradAuth)"
              stroke-width="1.5" stroke-dasharray="6 4" fill="none"
              style="animation: pulseRing 6s linear infinite; transform-origin: 19px 19px;" />
            <rect x="7" y="9" width="22" height="16" rx="5" fill="url(#bubbleGradAuth)" opacity="0.92"/>
            <path d="M11 25 L9 31 L17 25" fill="url(#bubbleGradAuth)" />
            <circle cx="12.5" cy="17" r="1.8" fill="#E8E4D9" opacity="0.9"/>
            <circle cx="19"   cy="17" r="1.8" fill="#E8E4D9" opacity="0.7"/>
            <circle cx="25.5" cy="17" r="1.8" fill="#E8E4D9" opacity="0.5"/>
            <line x1="19" y1="1"  x2="19" y2="5"  stroke="#2A8C8C" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
            <line x1="19" y1="33" x2="19" y2="37" stroke="#2A8C8C" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
            <line x1="1"  y1="19" x2="5"  y2="19" stroke="#2A8C8C" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
            <line x1="33" y1="19" x2="37" y2="19" stroke="#2A8C8C" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
            <defs>
              <linearGradient id="bubbleGradAuth" x1="7" y1="9" x2="29" y2="31" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#C0394B"/>
                <stop offset="100%" stop-color="#a02030"/>
              </linearGradient>
              <linearGradient id="ringGradAuth" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#2A8C8C"/>
                <stop offset="50%" stop-color="#C0394B"/>
                <stop offset="100%" stop-color="#2A8C8C"/>
              </linearGradient>
            </defs>
          </svg>
          <q-toolbar-title class="logo-title q-ml-sm q-pa-none">
            MB<span class="logo-accent">RP</span>
          </q-toolbar-title>
        </div>
      </q-toolbar>
    </q-header>

    <!-- ─── Content ───────────────────────────────────────────────────── -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
// Layout for auth pages
</script>

<style scoped>
/* Any layout specific styles can go here */
</style>
