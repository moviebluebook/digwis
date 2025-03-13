import { prisma } from '@/lib/prisma'
import Header from '../components/Header'
import ArticleCard from '../components/ArticleCard'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = (searchParams?.q as string) || '';

  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
      ],
    },
    include: {
      collections: true,
    },
  })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            搜索结果: {query}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            找到 {articles.length} 篇相关文章
          </p>
        </div>

        {articles.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                summary={article.summary}
                collections={article.collections}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              未找到与"{query}"相关的文章
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
