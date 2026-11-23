<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useClipboard } from '@vueuse/core'
import MermaidDiagram from '../MermaidDiagram.vue'
import ReactSyntaxHighlighter from '../ReactSyntaxHighlighter.vue'

const props = withDefaults(
  defineProps<{
    icon?: string | null
    code?: string
    language?: string
    filename?: string
    highlights?: number[]
    hideHeader?: boolean
    meta?: string
    copy?: boolean | Record<string, any>
    class?: any
    ui?: Record<string, any>
  }>(),
  {
    copy: true,
  }
)

const { copy: copyToClipboard, copied } = useClipboard()
const baseRef = useTemplateRef('baseRef')

const isMermaid = computed(() => {
  const lang = (props.language || '').toLowerCase().trim()
  return lang === 'mermaid'
})

function copyCode() {
  const text = props.code ?? baseRef.value?.textContent ?? ''
  copyToClipboard(text)
}
</script>

<template>
  <div v-if="isMermaid">
    <MermaidDiagram :code="props.code">
      <slot />
    </MermaidDiagram>
  </div>

  <div
    v-else
    class="relative my-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-[#1e1e1e] text-neutral-100 overflow-hidden shadow-sm group"
  >
    <div
      v-if="props.filename && !props.hideHeader"
      class="flex items-center justify-between px-4 py-2 bg-neutral-800/80 border-b border-neutral-700/60 text-xs font-mono text-neutral-300"
    >
      <div class="flex items-center gap-2">
        <span class="size-2 rounded-full bg-emerald-500/80" />
        <span>{{ props.filename }}</span>
      </div>
    </div>

    <button
      v-if="props.copy"
      type="button"
      aria-label="Copy code"
      class="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-lg border border-neutral-700/60 bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-100 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer shadow-sm"
      @click="copyCode"
    >
      <UIcon v-if="copied" name="i-lucide-check" class="size-4 text-emerald-400" />
      <UIcon v-else name="i-lucide-copy" class="size-4" />
    </button>

    <div v-if="props.code">
      <ReactSyntaxHighlighter :code="props.code" :language="props.language" />
    </div>
    <pre v-else ref="baseRef" class="p-4 text-sm font-mono overflow-x-auto"><slot /></pre>
  </div>
</template>
