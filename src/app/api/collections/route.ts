import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const collections = await prisma.collection.findMany({
      include: {
        articles: true
      }
    })
    return NextResponse.json(collections)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch collections' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const collection = await prisma.collection.create({
      data: {
        name: body.name,
        description: body.description,
        coverImage: body.coverImage,
        articles: {
          connect: body.articleIds?.map((id: number) => ({ id })) || []
        }
      }
    })
    return NextResponse.json(collection)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create collection' },
      { status: 500 }
    )
  }
}
