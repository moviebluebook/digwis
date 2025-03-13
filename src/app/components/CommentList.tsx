'use client'

import { useEffect, useState } from 'react'

interface Comment {
  id: number
  author: string
  content: string
  createdAt: string
}

interface CommentListProps {
  articleId: number
  refreshTrigger?: number
}

export default function CommentList({ articleId, refreshTrigger }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/comments?articleId=${articleId}`)
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || '获取评论失败')
        }
        const data = await response.json()
        setComments(data)
      } catch (error) {
        console.error('加载评论失败:', error)
        setError(error instanceof Error ? error.message : '加载评论失败')
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [articleId, refreshTrigger])

  if (isLoading) return <div className="text-center py-4">加载评论中...</div>
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-xl font-semibold">评论列表</h3>
      {comments.length === 0 ? (
        <p className="text-gray-500">暂无评论</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="border-b pb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">{comment.author}</span>
              <span className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))
      )}
    </div>
  )
}