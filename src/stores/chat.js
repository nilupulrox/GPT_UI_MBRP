import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useChatStore = defineStore('chat', () => {
  // ─── Active session messages ────────────────────────────────────────────
  const messages = ref([])

  // ─── Live title of the current active chat (first user message) ────────
  const activeTitle = computed(() => {
    const firstUser = messages.value.find(m => m.role === 'user')
    if (!firstUser) return null
    return firstUser.content.length > 48
      ? firstUser.content.slice(0, 48) + '…'
      : firstUser.content
  })

  // ─── Chat history (list of saved sessions) ─────────────────────────────
  const chatHistory = ref([])

  // ─── Start a new chat session ───────────────────────────────────────────
  function newChat () {
    // Save current conversation to history if it has a user message
    if (activeTitle.value) {
      chatHistory.value.unshift({
        id: Date.now(),
        title: activeTitle.value,
        snapshot: messages.value.slice()
      })
    }
    // Reset to fresh empty session
    messages.value = []
  }

  // ─── Restore a history session ──────────────────────────────────────────
  function loadSession (session) {
    messages.value = session.snapshot.slice()
  }

  // ─── Delete a history session by id ─────────────────────────────────────
  function deleteSession (id) {
    chatHistory.value = chatHistory.value.filter(s => s.id !== id)
  }

  return { messages, chatHistory, activeTitle, newChat, loadSession, deleteSession }
})
