/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 配置图片优化
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7天缓存
    // 开启图片优化
    unoptimized: false,
  },
  // 生产环境源码映射
  productionBrowserSourceMaps: false,
  // 优化首屏加载
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@headlessui/react', '@heroicons/react'],
    // 启用服务器组件
    serverComponents: true,
    // 启用并发特性
    concurrentFeatures: true,
    // 启用App目录特性
    appDir: true,
  },
  // 压缩HTML
  compress: true,
  // 静态资源优化
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://your-cloudflare-domain.com' : undefined,
  // CDN缓存配置
  headers: async () => [
    {
      source: '/:all*(svg|jpg|png|webp|avif)',
      locale: false,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, must-revalidate',
        },
      ],
    },
  ],
  // 严格模式
  reactStrictMode: true,
  // 输出独立构建
  output: 'standalone',
  // 禁用X-Powered-By头
  poweredByHeader: false,
}

export default nextConfig
