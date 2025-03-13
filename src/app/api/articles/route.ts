import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        collections: true
      }
    })
    return NextResponse.json(articles)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const article = await prisma.article.create({
      data: {
        title: body.title,
        content: body.content,
        summary: body.summary,
      }
    })
    return NextResponse.json(article)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json(
        { error: 'Article ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const article = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        content: body.content,
        summary: body.summary
      }
    })
    return NextResponse.json(article)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    )
  }
}
