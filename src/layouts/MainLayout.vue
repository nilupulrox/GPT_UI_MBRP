<template>
  <q-layout view="lHh Lpr lFf">
    <!-- ─── Header ─────────────────────────────────────────────────────── -->
    <q-header elevated class="glass-header">
      <q-toolbar style="min-height: 56px; padding: 0 12px;">
        <q-btn flat dense round icon="menu" aria-label="Menu"
          style="color: var(--mist); opacity: 0.7;" @click="toggleLeftDrawer" />

        <!-- Inline SVG Logo -->
        <div class="row items-center q-ml-sm logo-svg-wrap">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style="animation: logoGlow 3s ease-in-out infinite;">
            <circle cx="19" cy="19" r="17" stroke="url(#ringGrad)"
              stroke-width="1.5" stroke-dasharray="6 4" fill="none"
              style="animation: pulseRing 6s linear infinite; transform-origin: 19px 19px;" />
            <rect x="7" y="9" width="22" height="16" rx="5" fill="url(#bubbleGrad)" opacity="0.92"/>
            <path d="M11 25 L9 31 L17 25" fill="url(#bubbleGrad)" />
            <circle cx="12.5" cy="17" r="1.8" fill="#E8E4D9" opacity="0.9"/>
            <circle cx="19"   cy="17" r="1.8" fill="#E8E4D9" opacity="0.7"/>
            <circle cx="25.5" cy="17" r="1.8" fill="#E8E4D9" opacity="0.5"/>
            <line x1="19" y1="1"  x2="19" y2="5"  stroke="#2A8C8C" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
            <line x1="19" y1="33" x2="19" y2="37" stroke="#2A8C8C" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
            <line x1="1"  y1="19" x2="5"  y2="19" stroke="#2A8C8C" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
            <line x1="33" y1="19" x2="37" y2="19" stroke="#2A8C8C" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
            <defs>
              <linearGradient id="bubbleGrad" x1="7" y1="9" x2="29" y2="31" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#C0394B"/>
                <stop offset="100%" stop-color="#a02030"/>
              </linearGradient>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse">
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

        <q-space />

        <q-btn outline icon="fab fa-google" label="Sign in"
          class="glass-pill-btn" unelevated no-caps />
      </q-toolbar>
    </q-header>

    <!-- ─── Sidebar ────────────────────────────────────────────────────── -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="glass-sidebar"
      style="display: flex; flex-direction: column;">
      <div style="display: flex; flex-direction: column; height: 100%; overflow: hidden;">

        <!-- Brand header -->
        <div class="sidebar-header row items-center justify-between">
          <span class="sidebar-brand">MBRP AI</span>
          <span class="sidebar-version">v1.0</span>
        </div>

        <!-- New Chat -->
        <div class="q-px-sm q-pt-sm">
          <q-btn flat no-caps label="+ New Chat" class="full-width new-chat-btn"
            @click="chatStore.newChat()" />
        </div>

        <!-- Links section -->
        <div class="sidebar-section-label">Links</div>
        <q-list>
          <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
        </q-list>

        <!-- Chat History section -->
        <div class="sidebar-section-label" style="margin-top: 8px;">Recent Chats</div>

        <div class="history-list col scroll">
          <!-- Empty state -->
          <div v-if="chatStore.chatHistory.length === 0" class="history-empty">
            <q-icon name="chat_bubble_outline" size="22px"
              style="color: var(--teal); opacity: 0.35; display:block; margin: 0 auto 6px;"/>
            <span>No recent chats yet.<br/>Start a conversation!</span>
          </div>

          <!-- History items -->
          <div
            v-for="session in chatStore.chatHistory"
            :key="session.id"
            class="history-item"
            @click="chatStore.loadSession(session)"
          >
            <q-icon name="chat_bubble_outline" size="14px" class="history-icon" />
            <span class="history-title">{{ session.title }}</span>
          </div>
        </div>

      </div>
    </q-drawer>

    <!-- ─── Content ───────────────────────────────────────────────────── -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useChatStore } from 'stores/chat'

const chatStore = useChatStore()

const linksList = [
  {
    title: 'MBRP LinkedIn',
    caption: 'Official Page',
    icon: 'business',
    link: 'https://www.linkedin.com/company/microbial-biotechnology-unit-of-the-national-institute-of-fundamental-studies'
  },
  {
    title: 'SciSpark Research',
    caption: 'SciSpark Paper',
    icon: 'science',
    link: 'https://www.researchgate.net/publication/404314129_SciSpark'
  },
  {
    title: 'Community Discord',
    caption: 'Join Server',
    icon: 'chat',
    link: 'https://discord.gg/7evys9XMc'
  },
  {
    title: 'RajGithub',
    caption: 'Developer',
    icon: 'code',
    link: 'https://github.com/nilupulrox'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
