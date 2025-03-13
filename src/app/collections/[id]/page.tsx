import Header from '../../components/Header'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import ArticleCard from '../../components/ArticleCard'
import { notFound } from 'next/navigation'

export default async function CollectionPage({
  params,
}: {
  params: { id: string }
}) {
  const collection = await prisma.collection.findUnique({
    where: {
      id: parseInt(params?.id as string)
    },
    include: {
      articles: true
    }
  })

  if (!collection) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-24">
        {/* Collection Header */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative h-64 rounded-xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-black/30 z-10" />
            <Image
              src={collection.coverImage}
              alt={collection.name}
              className="object-cover"
              fill
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
              <h1 className="text-4xl font-bold text-white mb-4">
                {collection.name}
              </h1>
              {collection.description && (
                <p className="text-lg text-gray-100">
                  {collection.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            合集文章 ({collection.articles.length})
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {collection.articles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                summary={article.summary}
                collections={[collection]}
              />
            ))}
          </div>

          {collection.articles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                该合集暂无文章
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
