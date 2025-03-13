import Header from '../components/Header'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              关于数智
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              探索知识的深度，连接智慧的未来
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                我们的愿景
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                在这个信息爆炸的时代，我们致力于为读者提供深度的思考和见解。我们相信，真正的智慧来自于对知识的深入理解和多维度思考。
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                通过跨学科的视角，我们探索科技、哲学、人文等领域的前沿话题，帮助读者在纷繁复杂的现代社会中，找到清晰的思考方向。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  我们的使命
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li>• 提供高质量的深度内容</li>
                  <li>• 促进跨学科的知识融合</li>
                  <li>• 培养独立思考的能力</li>
                  <li>• 连接全球智慧资源</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  我们的价值观
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li>• 追求真理与智慧</li>
                  <li>• 保持开放与包容</li>
                  <li>• 重视深度与质量</li>
                  <li>• 注重实践与创新</li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                加入我们
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                如果您对我们的理念感兴趣，欢迎通过以下方式参与进来：
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  成为作者
                </button>
                <button className="border border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  加入讨论
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
