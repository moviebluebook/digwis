'use client';

import { useParams } from 'next/navigation';
import { articles } from '@/app/data/articles';

export default function ArticlePage() {
  const params = useParams();
  const title = decodeURIComponent(params.title as string);
  const article = articles.find(a => a.title === title);

  if (!article) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">文章未找到</h1>
          <p className="text-gray-600 dark:text-gray-400">抱歉，我们找不到您请求的文章。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{article.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{article.author}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{article.date}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{article.readTime}</span>
            </div>
          </div>
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{article.content}</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}