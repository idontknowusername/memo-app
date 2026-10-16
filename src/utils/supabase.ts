import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Memo } from '@/types/memo'

// DB 행 타입 (snake_case) - 앱의 Memo 인터페이스와 1:1 매핑
export interface MemoRow {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  created_at: string
  updated_at: string
}

let client: SupabaseClient | null = null

// 서버 액션에서만 사용하는 Supabase 클라이언트 (싱글톤)
export const getSupabase = (): SupabaseClient => {
  if (client) return client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error(
      'Supabase 환경변수(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)가 설정되지 않았습니다.'
    )
  }

  client = createClient(url, key, { auth: { persistSession: false } })
  return client
}

export const rowToMemo = (row: MemoRow): Memo => ({
  id: row.id,
  title: row.title,
  content: row.content,
  category: row.category,
  tags: row.tags ?? [],
  createdAt: row.created_at,
  updatedAt: row.updated_at,
})
