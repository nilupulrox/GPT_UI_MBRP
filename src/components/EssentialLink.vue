<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    :href="props.link"
    class="cyber-link"
  >
    <q-item-section v-if="props.icon" avatar style="min-width: 38px;">
      <q-icon :name="props.icon" size="20px" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="sidebar-label">{{ props.title }}</q-item-label>
      <q-item-label caption>{{ props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
const props = defineProps({
  title:   { type: String, required: true },
  caption: { type: String, default: '' },
  link:    { type: String, default: '#' },
  icon:    { type: String, default: '' }
})
</script>
