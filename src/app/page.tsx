'use client'

import Image from 'next/image'
import Header from './components/Header'
import ArticleCard from './components/ArticleCard'
import CommentForm from './components/CommentForm'
import CommentList from './components/CommentList'
import { useState, useEffect } from 'react'

interface Article {
  id: number
  title: string
  summary: string
  collections: Array<{
    id: number
    name: string
    description: string | null
    coverImage: string
  }>
}

export default function Home() {
  const [refreshComments, setRefreshComments] = useState(0)
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles')
        if (!response.ok) throw new Error('获取文章失败')
        const data = await response.json()
        setArticles(data)
      } catch (error) {
        console.error('加载文章失败:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [])
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      {/* Hero Section with Custom Background */}
      <section className="relative pt-24 pb-32 mt-16 px-4 flex items-center min-h-[600px]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90"></div>
          <Image
            src="/images/hero-dark.jpg"
            alt="Background"
            className="w-full h-full object-cover"
            fill
            priority
          />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              探索知识的深度<br/>
              连接智慧的未来
            </h1>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              欢迎来到数智，这里是思想的交汇点。我们致力于探索科技、哲学与人文的深度内容，
              为您带来独特的思维视角和知识见解。
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors transform hover:scale-105 duration-200 shadow-lg">
                开始阅读
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors transform hover:scale-105 duration-200">
                了解更多
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections Preview */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            精选主题
          </h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <div className="col-span-3 text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">加载中...</p>
              </div>
            ) : articles.length > 0 ? (
              articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  summary={article.summary}
                  collections={article.collections}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">暂无文章</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">留言板</h2>
          <div className="max-w-3xl mx-auto">
            <CommentForm articleId={0} onCommentAdded={() => setRefreshComments(prev => prev + 1)} />
            <CommentList articleId={0} refreshTrigger={refreshComments} />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            订阅更新
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            订阅我们的周刊，获取最新的思考与见解
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="您的邮箱地址"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              订阅
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
