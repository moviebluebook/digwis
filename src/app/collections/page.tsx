import Header from '../components/Header'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'

export default async function CollectionsPage() {
  const collections = await prisma.collection.findMany({
    include: {
      articles: true,
    },
  })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              文章合集
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              精心策划的主题文章集合，深入探讨各个领域的知识
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={collection.coverImage}
                    alt={collection.name}
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {collection.name}
                  </h2>
                  {collection.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {collection.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {collection.articles.length} 篇文章
                    </span>
                    <Link
                      href={`/collections/${collection.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                    >
                      查看合集
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
