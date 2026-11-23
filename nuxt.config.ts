export default defineNuxtConfig({
  extends: ['docus'],
  site: {
    name: 'HTTP PostgreSQL Gateway',
    url: 'https://http-postgres.github.io',
    description: 'Persistent HTTP-to-PostgreSQL gateway with connection pooling, fine-grained CRUD authorization, and transaction support for serverless and edge runtimes.',
  },
  app: {
    head: {
      titleTemplate: '%s · HTTP PostgreSQL Gateway',
      title: 'HTTP PostgreSQL Gateway Documentation',
      meta: [
        { name: 'description', content: 'Persistent HTTP-to-PostgreSQL gateway with connection pooling, fine-grained CRUD authorization, and transaction support for serverless and edge runtimes.' },
        { property: 'og:site_name', content: 'HTTP PostgreSQL Gateway' },
        { property: 'og:title', content: 'HTTP PostgreSQL Gateway Documentation' },
        { property: 'og:description', content: 'Connect serverless and edge functions to PostgreSQL with standard fetch(), connection pooling, and scoped roles.' },
        { property: 'og:image', content: '/logo.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: '/logo.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-32.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hook('modules:done', () => {
        if (nuxt.options.runtimeConfig?.public?.assistant) {
          nuxt.options.runtimeConfig.public.assistant.enabled = false
        }
      })
    },
  ],
  mdc: {
    components: {
      map: {
        important: 'ProseWarning',
      },
    },
  },
  runtimeConfig: {
    public: {
      assistant: {
        enabled: false,
        apiPath: '',
      },
    },
  },
})
