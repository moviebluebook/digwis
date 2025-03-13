'use client'

import { useState } from 'react'

interface CommentFormProps {
  articleId: number
  onCommentAdded?: () => void
}

export default function CommentForm({ articleId, onCommentAdded }: CommentFormProps) {
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!author.trim() || !content.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, content, articleId })
      })

      if (!response.ok) throw new Error('提交失败')
      
      setAuthor('')
      setContent('')
      onCommentAdded?.();
    } catch (error) {
      console.error('评论提交失败:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="您的昵称"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="写下您的留言..."
          className="w-full px-3 py-2 border rounded-md"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isSubmitting ? '提交中...' : '提交留言'}
      </button>
    </form>
  )
}