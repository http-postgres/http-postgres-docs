<script setup lang="ts">
import { ref, onMounted, useTemplateRef } from 'vue'

const props = defineProps<{
  code?: string
}>()

const svg = ref<string>('')
const error = ref<string | null>(null)
const slotRef = useTemplateRef<HTMLElement>('slotRef')
const id = 'mermaid_' + Math.random().toString(36).substring(2, 9)

function decodeEntities(str: string): string {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}

onMounted(async () => {
  if (import.meta.client) {
    try {
      const { default: mermaid } = await import('mermaid')
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
          darkMode: true,
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontSize: '12px',
          textColor: '#ffffff',
          mainBkg: '#27272a',
          nodeBorder: '#52525b',
          nodeTextColor: '#ffffff',
          lineColor: '#10b981',
          primaryColor: '#27272a',
          primaryTextColor: '#ffffff',
          primaryBorderColor: '#52525b',
          secondaryColor: '#27272a',
          secondaryTextColor: '#ffffff',
          secondaryBorderColor: '#52525b',
          tertiaryColor: '#27272a',
          tertiaryTextColor: '#ffffff',
          tertiaryBorderColor: '#52525b',
          edgeLabelBackground: '#18181b',
          clusterBkg: '#141416',
          clusterBorder: '#3f3f46',
          titleColor: '#34d399',
        },
        flowchart: {
          curve: 'basis',
          padding: 20,
          nodeSpacing: 40,
          rankSpacing: 65,
          htmlLabels: true,
          useMaxWidth: true,
        },
        securityLevel: 'loose',
      })
      
      const unescaped = decodeEntities(props.code || slotRef.value?.textContent || '')
      const cleanCode = unescaped.trim()
      
      if (!cleanCode) {
        error.value = 'No diagram code provided'
        return
      }

      const renderResult = await mermaid.render(id, cleanCode)
      let svgContent = renderResult.svg

      // Inject custom styling directly into SVG root to guarantee high contrast, padding, and zero text truncation
      const customStyles = `
        <style>
          #${id} foreignObject {
            overflow: visible !important;
          }
          #${id} svg text,
          #${id} svg tspan {
            overflow: visible !important;
          }
          #${id} .edgeLabel {
            background-color: #18181b !important;
            color: #ffffff !important;
            padding: 4px 8px !important;
            border-radius: 6px !important;
            border: 1px solid #3f3f46 !important;
            display: inline-block !important;
            white-space: nowrap !important;
            overflow: visible !important;
          }
          #${id} .edgeLabel rect {
            fill: #18181b !important;
            stroke: #3f3f46 !important;
            stroke-width: 1px !important;
            rx: 6px !important;
            ry: 6px !important;
            opacity: 1 !important;
          }
          #${id} .edgeLabel text,
          #${id} .edgeLabel tspan,
          #${id} .edgeLabel span,
          #${id} .edgeLabel p,
          #${id} .edgeLabel div,
          #${id} .labelBkg {
            fill: #ffffff !important;
            color: #ffffff !important;
            background-color: transparent !important;
            font-size: 11px !important;
            font-weight: 500 !important;
            line-height: 1.3 !important;
            white-space: nowrap !important;
            overflow: visible !important;
          }
          #${id} .node rect,
          #${id} .node polygon,
          #${id} .node circle,
          #${id} .node path {
            fill: #27272a !important;
            stroke: #52525b !important;
            stroke-width: 1.5px !important;
            rx: 8px !important;
            ry: 8px !important;
          }
          #${id} .node text,
          #${id} .node tspan,
          #${id} .node span,
          #${id} .node .label {
            fill: #ffffff !important;
            color: #ffffff !important;
            font-size: 12px !important;
            overflow: visible !important;
          }
          #${id} .cluster rect {
            fill: rgba(20, 20, 22, 0.85) !important;
            stroke: #3f3f46 !important;
            stroke-width: 1.5px !important;
            stroke-dasharray: 4 4 !important;
            rx: 12px !important;
            ry: 12px !important;
          }
          #${id} .cluster text,
          #${id} .cluster span,
          #${id} .cluster .cluster-label text,
          #${id} .cluster .cluster-label span {
            fill: #34d399 !important;
            color: #34d399 !important;
            font-weight: 600 !important;
            font-size: 12px !important;
            overflow: visible !important;
          }
          #${id} .edgePath path {
            stroke: #10b981 !important;
            stroke-width: 2px !important;
          }
          #${id} .marker,
          #${id} marker path {
            fill: #10b981 !important;
            stroke: #10b981 !important;
          }
        </style>
      `
      svgContent = svgContent.replace('</svg>', `${customStyles}</svg>`)
      svg.value = svgContent
    } catch (err: any) {
      error.value = err?.message || 'Failed to render flowchart'
      console.error('Mermaid render error:', err)
    }
  }
})
</script>

<template>
  <div class="my-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-900/90 dark:bg-neutral-950/80 p-6 flex justify-center overflow-x-auto shadow-sm">
    <!-- Hidden container to capture slot text if props.code was not provided -->
    <div ref="slotRef" class="hidden"><slot /></div>

    <!-- Diagram canvas -->
    <div v-if="svg" v-html="svg" class="mermaid-canvas w-full flex justify-center" />
    <div v-else-if="error" class="text-xs text-red-400 font-mono p-4">
      {{ error }}
    </div>
    <div v-else class="text-xs text-neutral-400 py-6 flex items-center justify-center gap-2 animate-pulse">
      <UIcon name="i-lucide-loader-2" class="size-4 animate-spin text-emerald-500" />
      <span>Rendering diagram...</span>
    </div>
  </div>
</template>

<style scoped>
:deep(.mermaid-canvas svg) {
  max-width: 100% !important;
  max-height: 480px !important;
  height: auto !important;
  display: block;
  margin: 0 auto;
}

:deep(.mermaid-canvas foreignObject) {
  overflow: visible !important;
}

:deep(.mermaid-canvas svg text),
:deep(.mermaid-canvas svg tspan) {
  overflow: visible !important;
}

/* Nodes: rect, polygon, circle, and cylinder paths */
:deep(.mermaid-canvas .node rect),
:deep(.mermaid-canvas .node polygon),
:deep(.mermaid-canvas .node circle),
:deep(.mermaid-canvas .node path) {
  rx: 8px !important;
  ry: 8px !important;
  stroke: #52525b !important;
  stroke-width: 1.5px !important;
  fill: #27272a !important;
}

/* All node text content */
:deep(.mermaid-canvas .node text),
:deep(.mermaid-canvas .node tspan),
:deep(.mermaid-canvas .node span),
:deep(.mermaid-canvas .node b),
:deep(.mermaid-canvas .node strong),
:deep(.mermaid-canvas .node .label) {
  fill: #ffffff !important;
  color: #ffffff !important;
  font-family: inherit !important;
  font-size: 12px !important;
  line-height: 1.35 !important;
}

/* Cluster / Subgraph box */
:deep(.mermaid-canvas .cluster rect) {
  rx: 12px !important;
  ry: 12px !important;
  stroke: #3f3f46 !important;
  stroke-width: 1.5px !important;
  stroke-dasharray: 4 4 !important;
  fill: rgba(20, 20, 22, 0.85) !important;
}

/* Cluster title */
:deep(.mermaid-canvas .cluster text),
:deep(.mermaid-canvas .cluster tspan),
:deep(.mermaid-canvas .cluster span),
:deep(.mermaid-canvas .cluster .cluster-label text),
:deep(.mermaid-canvas .cluster .cluster-label span) {
  fill: #34d399 !important;
  color: #34d399 !important;
  font-weight: 600 !important;
  font-size: 12px !important;
  overflow: visible !important;
}

/* Edge connecting lines */
:deep(.mermaid-canvas .edgePath path) {
  stroke: #10b981 !important;
  stroke-width: 2px !important;
}

/* Arrowheads */
:deep(.mermaid-canvas .marker),
:deep(.mermaid-canvas marker path) {
  fill: #10b981 !important;
  stroke: #10b981 !important;
}

/* Edge Labels - HIGH CONTRAST BADGES WITH SOLID BACKGROUND */
:deep(.mermaid-canvas .edgeLabel) {
  background-color: #18181b !important;
  color: #ffffff !important;
  padding: 4px 8px !important;
  border-radius: 6px !important;
  border: 1px solid #3f3f46 !important;
  display: inline-block !important;
  white-space: nowrap !important;
  overflow: visible !important;
}

:deep(.mermaid-canvas .edgeLabel rect) {
  fill: #18181b !important;
  stroke: #3f3f46 !important;
  stroke-width: 1px !important;
  rx: 6px !important;
  ry: 6px !important;
  opacity: 1 !important;
}

:deep(.mermaid-canvas .edgeLabel text),
:deep(.mermaid-canvas .edgeLabel tspan),
:deep(.mermaid-canvas .edgeLabel span),
:deep(.mermaid-canvas .edgeLabel p),
:deep(.mermaid-canvas .edgeLabel div),
:deep(.mermaid-canvas .labelBkg) {
  fill: #ffffff !important;
  color: #ffffff !important;
  background-color: transparent !important;
  font-size: 11px !important;
  font-weight: 500 !important;
  line-height: 1.3 !important;
  white-space: nowrap !important;
  overflow: visible !important;
}
</style>
