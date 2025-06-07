import COMMENT_SUGGESTIONS from '@/pages/home/data/comments'
import { useMemo } from 'react'

export default function useRandomComments() {
  const commentSuggestions = useMemo(() => {
    const shuffled = [...COMMENT_SUGGESTIONS].sort(() => 0.5 - Math.random())
    const count = Math.floor(Math.random() * 10) + 15 // 10-15个建议
    return shuffled.slice(0, count)
  }, [])

  return commentSuggestions
}
