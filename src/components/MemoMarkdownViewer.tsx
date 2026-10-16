'use client'

import dynamic from 'next/dynamic'
import rehypeSanitize from 'rehype-sanitize'
import '@uiw/react-markdown-preview/markdown.css'

const MarkdownPreview = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default.Markdown),
  { ssr: false }
)

interface MemoMarkdownViewerProps {
  source: string
}

export default function MemoMarkdownViewer({
  source,
}: MemoMarkdownViewerProps) {
  return (
    <div data-color-mode="light" data-testid="memo-markdown-viewer">
      <MarkdownPreview
        source={source}
        rehypePlugins={[[rehypeSanitize]]}
        className="!bg-transparent !text-sm"
      />
    </div>
  )
}
