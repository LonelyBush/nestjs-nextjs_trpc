import { collectRoutes, generateDocsHtml } from 'trpc-docs-generator'

import { appRouter } from '@api/@generated/server'

export async function GET() {
  const routes = collectRoutes(appRouter)
  const html = generateDocsHtml(routes, {
    title: 'API Documentation',
  })

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  })
}
