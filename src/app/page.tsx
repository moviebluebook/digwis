'use client';

import { useState } from 'react';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import { articles } from './data/articles';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <section className="relative py-24 px-4">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.svg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            探索智慧的深度
          </h1>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            在这里，我们深入探讨哲学、科技与人文的交汇，共同寻找智慧的真谛
          </p>
          <div className="flex justify-center space-x-6">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors transform hover:scale-105 duration-200 shadow-lg">
              开始阅读
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors transform hover:scale-105 duration-200">
              了解更多
            </button>
          </div>
        </div>
      </section>
      <main className="container mx-auto px-4 py-16 -mt-12 relative z-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>
      </main>
    </div>
  );
}
