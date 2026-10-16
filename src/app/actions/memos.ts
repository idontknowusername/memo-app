'use server'

import { Memo, MemoFormData } from '@/types/memo'
import { getSupabase, MemoRow, rowToMemo } from '@/utils/supabase'

const TABLE = 'memos'

// 모든 메모 조회 (최신순)
export async function getMemos(): Promise<Memo[]> {
  const { data, error } = await getSupabase()
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })
    .returns<MemoRow[]>()

  if (error) {
    console.error('메모 조회 실패:', error)
    throw new Error('메모를 불러오지 못했습니다.')
  }
  return data.map(rowToMemo)
}

// 메모 생성 (id는 DB의 uuid v4 기본값 사용)
export async function createMemo(formData: MemoFormData): Promise<Memo> {
  const { data, error } = await getSupabase()
    .from(TABLE)
    .insert({
      title: formData.title,
      content: formData.content,
      category: formData.category,
      tags: formData.tags,
    })
    .select()
    .single<MemoRow>()

  if (error) {
    console.error('메모 생성 실패:', error)
    throw new Error('메모를 저장하지 못했습니다.')
  }
  return rowToMemo(data)
}

// 메모 수정
export async function updateMemo(
  id: string,
  formData: MemoFormData
): Promise<Memo> {
  const { data, error } = await getSupabase()
    .from(TABLE)
    .update({
      title: formData.title,
      content: formData.content,
      category: formData.category,
      tags: formData.tags,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single<MemoRow>()

  if (error) {
    console.error('메모 수정 실패:', error)
    throw new Error('메모를 수정하지 못했습니다.')
  }
  return rowToMemo(data)
}

// 메모 삭제
export async function deleteMemo(id: string): Promise<void> {
  const { error } = await getSupabase().from(TABLE).delete().eq('id', id)

  if (error) {
    console.error('메모 삭제 실패:', error)
    throw new Error('메모를 삭제하지 못했습니다.')
  }
}

// 모든 메모 삭제
export async function clearMemos(): Promise<void> {
  const { error } = await getSupabase()
    .from(TABLE)
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000')

  if (error) {
    console.error('메모 전체 삭제 실패:', error)
    throw new Error('메모를 삭제하지 못했습니다.')
  }
}
