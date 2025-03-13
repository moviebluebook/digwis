import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const articleId = searchParams.get('articleId')

  try {
    const comments = await prisma.comment.findMany({
      where: {
        articleId: articleId ? parseInt(articleId) : undefined
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(comments)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const comment = await prisma.comment.create({
      data: {
        content: body.content,
        author: body.author,
        articleId: parseInt(body.articleId)
      }
    })
    return NextResponse.json(comment)
  } catch (error) {
    console.error('Failed to create comment:', error)
    return NextResponse.json(
      { error: '评论提交失败，请稍后重试' },
      { status: 500 }
    )
  }
}