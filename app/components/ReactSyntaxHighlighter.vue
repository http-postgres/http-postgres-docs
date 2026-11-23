<script setup lang="ts">
import { computed } from 'vue'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism/index.js'

const props = defineProps<{
  code: string
  language?: string
}>()

const highlightedHtml = computed(() => {
  if (!props.code) return ''
  try {
    let lang = props.language || 'text'
    if (lang === 'sh' || lang === 'shell') lang = 'bash'
    if (lang === 'ts') lang = 'typescript'
    if (lang === 'js') lang = 'javascript'
    if (lang === 'env' || lang === 'dotenv') lang = 'bash'

    return renderToString(
      React.createElement(
        SyntaxHighlighter,
        {
          language: lang,
          style: vscDarkPlus,
          PreTag: 'div',
          customStyle: {
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '0.875rem',
            lineHeight: '1.5rem',
            fontFamily: 'inherit',
          },
        },
        props.code.trimEnd()
      )
    )
  } catch (err) {
    return `<pre class="p-4 text-sm font-mono overflow-x-auto"><code>${props.code}</code></pre>`
  }
})
</script>

<template>
  <div v-html="highlightedHtml" class="react-syntax-highlighter-container overflow-x-auto" />
</template>
