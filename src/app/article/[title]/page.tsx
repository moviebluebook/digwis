'use client'

import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';
import CommentForm from '../../components/CommentForm';
import CommentList from '../../components/CommentList';
import { useState } from 'react';

export default async function ArticlePage({
  params,
}: {
  params: { title: string };
}) {
  const title = decodeURIComponent(params?.title as string);
  const article = await prisma.article.findUnique({
    where: { title },
    include: { collections: true }
  });

  if (!article) {
    notFound();
  }

  const formattedDate = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {article.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{Math.ceil(article.content.length / 500)} 分钟阅读</span>
            </div>
          </div>
          {article.collections[0] && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
              <img
                src={article.collections[0].coverImage}
                alt={article.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {article.content}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {article.collections.map((collection) => (
              <span
                key={collection.id}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm"
              >
                {collection.name}
              </span>
            ))}
          </div>
          
          <div className="mb-8">
            <button
              onClick={() => router.push(`/article/edit/${article.id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              编辑文章
            </button>
          </div>

          <div className="mt-12">
            <CommentForm articleId={article.id} onCommentAdded={() => setRefreshComments(prev => prev + 1)} />
            <CommentList articleId={article.id} refreshTrigger={refreshComments} />
          </div>
        </article>
      </div>
    </div>
  );
}
