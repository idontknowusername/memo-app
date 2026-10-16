'use client'

import dynamic from 'next/dynamic'
import rehypeSanitize from 'rehype-sanitize'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

// 에디터는 브라우저 전용이므로 SSR 비활성화
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <div className="h-80 flex items-center justify-center border border-gray-300 rounded-lg text-sm text-gray-500">
      에디터를 불러오는 중...
    </div>
  ),
})

interface MemoMarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  id?: string
}

export default function MemoMarkdownEditor({
  value,
  onChange,
  id,
}: MemoMarkdownEditorProps) {
  return (
    <div data-color-mode="light" data-testid="memo-markdown-editor">
      <MDEditor
        value={value}
        onChange={newValue => onChange(newValue ?? '')}
        preview="live"
        height={320}
        textareaProps={{
          id,
          placeholder: '마크다운으로 메모 내용을 입력하세요',
        }}
        previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
      />
    </div>
  )
}
