<template>
  <q-page class="column full-height chat-page">

    <!-- ─── Chat Messages Area ──────────────────────────────────────────── -->
    <div class="chat-container col full-width scroll" ref="chatArea">
      <div class="chat-inner">

        <!-- Welcome state -->
        <div v-if="isWelcomeState" class="welcome-area">
          <svg width="80" height="80" viewBox="0 0 38 38" fill="none"
            xmlns="http://www.w3.org/2000/svg" class="welcome-logo">
            <circle cx="19" cy="19" r="17" stroke="url(#wRingGrad)"
              stroke-width="1.5" stroke-dasharray="6 4" fill="none"
              style="animation: pulseRing 6s linear infinite; transform-origin: 19px 19px;"/>
            <rect x="7" y="9" width="22" height="16" rx="5" fill="url(#wBubbleGrad)" opacity="0.92"/>
            <path d="M11 25 L9 31 L17 25" fill="url(#wBubbleGrad)" />
            <circle cx="12.5" cy="17" r="1.8" fill="#E8E4D9" opacity="0.9"/>
            <circle cx="19"   cy="17" r="1.8" fill="#E8E4D9" opacity="0.7"/>
            <circle cx="25.5" cy="17" r="1.8" fill="#E8E4D9" opacity="0.5"/>
            <line x1="19" y1="1"  x2="19" y2="5"  stroke="#2A8C8C" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
            <line x1="19" y1="33" x2="19" y2="37" stroke="#2A8C8C" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
            <line x1="1"  y1="19" x2="5"  y2="19" stroke="#2A8C8C" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
            <line x1="33" y1="19" x2="37" y2="19" stroke="#2A8C8C" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
            <defs>
              <linearGradient id="wBubbleGrad" x1="7" y1="9" x2="29" y2="31" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#C0394B"/>
                <stop offset="100%" stop-color="#a02030"/>
              </linearGradient>
              <linearGradient id="wRingGrad" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#2A8C8C"/>
                <stop offset="50%" stop-color="#C0394B"/>
                <stop offset="100%" stop-color="#2A8C8C"/>
              </linearGradient>
            </defs>
          </svg>
          <div class="welcome-title">What can I help you <span class="accent">research</span>?</div>
          <div class="welcome-sub">MBRP AI · Microbial Biotechnology Research Database</div>
        </div>

        <!-- Message list -->
        <div
          v-for="(msg, index) in chatStore.messages"
          :key="index"
          class="message-row"
          :class="msg.role === 'user' ? 'message-row--user' : 'message-row--ai'"
        >
          <div class="message-wrap">
            <div class="bubble-label" :class="msg.role === 'user' ? 'user-label' : 'ai-label'">
              {{ msg.role === 'user' ? 'You' : 'MBRP AI' }}
              <span v-if="msg.role !== 'user'" class="status-dot"></span>
            </div>
            <div :class="msg.role === 'user' ? 'terminal-bubble-user' : 'terminal-bubble-ai'">
              {{ msg.content }}
            </div>
          </div>
        </div>

        <!-- Typing indicator -->
        <div v-if="isProcessing" class="message-row message-row--ai">
          <div class="message-wrap">
            <div class="bubble-label ai-label">MBRP AI</div>
            <div class="typing-indicator">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- ─── Input Area ─────────────────────────────────────────────────── -->
    <div class="chat-input-area full-width">
      <div class="chat-input-inner">
        <q-input
          v-model="newMessage"
          dark color="teal"
          placeholder="Ask MBRP Research Database..."
          @keyup.enter="sendMessage"
          class="chat-input-field col"
          :class="{ 'scanning': isProcessing }"
          dense borderless
        />
        <q-btn round flat icon="send" class="send-btn q-ml-sm"
          @click="sendMessage" :disable="isProcessing" />
      </div>
      <div class="input-disclaimer">
        MBRP AI may produce inaccurate information. Verify critical data.
      </div>
    </div>

  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useChatStore } from 'stores/chat'

const chatStore = useChatStore()
const newMessage = ref('')
const chatArea = ref(null)
const isProcessing = ref(false)

// Welcome state: only the initial assistant message, no user messages yet
const isWelcomeState = computed(() =>
  chatStore.messages.length === 1 && chatStore.messages[0].role === 'assistant'
)

const sendMessage = () => {
  if (newMessage.value.trim() === '' || isProcessing.value) return

  chatStore.messages.push({ role: 'user', content: newMessage.value })
  const userMsg = newMessage.value
  newMessage.value = ''
  isProcessing.value = true

  scrollToBottom()

  setTimeout(() => {
    isProcessing.value = false
    chatStore.messages.push({
      role: 'assistant',
      content: `Searching database for: "${userMsg}"… No matches found in current demo. In a live environment, this would return specific paper excerpts and analysis.`
    })
    scrollToBottom()
  }, 1600)
}

const scrollToBottom = () => {
  setTimeout(() => {
    if (chatArea.value) {
      chatArea.value.scrollTop = chatArea.value.scrollHeight
    }
  }, 50)
}
</script>
