import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
  // ─── Active session messages ────────────────────────────────────────────
  const messages = ref([
    {
      role: 'assistant',
      content: 'Welcome to the MBRP Research Paper Database. How can I assist you with microbial biotechnology today? I can help summarize papers, provide methodology details, or analyze data trends.'
    }
  ])

  // ─── Chat history (list of saved sessions) ─────────────────────────────
  const chatHistory = ref([])

  // ─── Start a new chat session ───────────────────────────────────────────
  function newChat () {
    // Save current conversation to history (use first user message as title)
    const firstUser = messages.value.find(m => m.role === 'user')
    if (firstUser) {
      chatHistory.value.unshift({
        id: Date.now(),
        title: firstUser.content.length > 48
          ? firstUser.content.slice(0, 48) + '…'
          : firstUser.content,
        snapshot: messages.value.slice()
      })
    }
    // Reset to fresh session
    messages.value = [
      {
        role: 'assistant',
        content: 'Welcome to the MBRP Research Paper Database. How can I assist you with microbial biotechnology today?'
      }
    ]
  }

  // ─── Restore a history session ──────────────────────────────────────────
  function loadSession (session) {
    messages.value = session.snapshot.slice()
  }

  return { messages, chatHistory, newChat, loadSession }
})
