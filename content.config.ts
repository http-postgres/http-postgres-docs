import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const createDocsSchema = () => z.object({
  links: z.array(z.object({
    label: z.string(),
    icon: z.string(),
    to: z.string(),
    target: z.string().optional(),
  })).optional(),
})

const repoUrl = process.env.DOCS_REPO_URL
const repoBranch = process.env.DOCS_REPO_BRANCH || 'main'
const repoToken = process.env.NUXT_GITHUB_TOKEN || process.env.GITHUB_TOKEN

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: repoUrl ? {
        repository: {
          url: repoUrl,
          branch: repoBranch,
          ...(repoToken ? { auth: { token: repoToken } } : {}),
        },
        include: 'content/**',
        prefix: '/',
        exclude: ['content/index.md'],
      } : {
        include: '**',
        prefix: '/',
        exclude: ['index.md'],
      },
      schema: createDocsSchema(),
    }),
    landing: defineCollection({
      type: 'page',
      source: repoUrl ? {
        repository: {
          url: repoUrl,
          branch: repoBranch,
          ...(repoToken ? { auth: { token: repoToken } } : {}),
        },
        include: 'content/*',
        prefix: '/',
      } : {
        include: 'index.md',
        prefix: '/',
      },
    }),
  },
})
