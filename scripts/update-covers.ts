import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 清理现有数据
  await prisma.article.deleteMany();
  await prisma.collection.deleteMany();

  // 创建新的合集
  const aiCollection = await prisma.collection.create({
    data: {
      name: '人工智能与未来',
      description: '探索AI发展与人类未来的关系',
      coverImage: '/images/covers/ai-future.svg'
    }
  });

  const modernCollection = await prisma.collection.create({
    data: {
      name: '现代思维方式',
      description: '探讨现代社会中的思维模式与挑战',
      coverImage: '/images/covers/modern-thinking.svg'
    }
  });

  const philosophyCollection = await prisma.collection.create({
    data: {
      name: '东西方哲学',
      description: '比较东西方哲学思想的异同',
      coverImage: '/images/covers/philosophy.svg'
    }
  });

  // 创建文章并关联到合集
  await prisma.article.create({
    data: {
      title: '人工智能与人类思维的未来',
      content: '在人工智能快速发展的今天，我们正站在技术与人性的十字路口。本文深入探讨了AI如何重塑我们的思维方式，以及在这场技术革命中，人类如何保持独特的思考能力和创造力。通过分析具体案例，我们将看到AI不仅是工具，更是促使我们重新思考人类认知本质的催化剂。文章同时提出了在AI时代保持人性思考的具体建议，帮助读者在技术浪潮中找到平衡点。',
      summary: '探讨AI发展对人类思维的影响，以及如何在技术革命中保持人性思考...',
      collections: {
        connect: { id: aiCollection.id }
      }
    }
  });

  await prisma.article.create({
    data: {
      title: '现代社会中的思想困境',
      content: '在这个信息爆炸的时代，我们每天都面临着海量的信息输入，但真正的智慧似乎越来越难以获得。本文从社会心理学的角度，分析了现代人在信息洪流中遇到的思想困境：信息过载、认知偏差、群体极化等问题。文章不仅指出了这些挑战，更提供了实用的方法论，帮助读者在纷繁复杂的现代社会中培养独立思考能力，找回真实的自我。',
      summary: '分析现代社会中的信息过载、认知偏差等思想困境，提供培养独立思考能力的方法...',
      collections: {
        connect: { id: modernCollection.id }
      }
    }
  });

  await prisma.article.create({
    data: {
      title: '东西方哲学的对话',
      content: '在全球化的今天，东西方文化的交流与碰撞已成为不可避免的趋势。本文通过对比儒家思想、道家哲学与西方启蒙运动、现代哲学的核心理念，探讨了东西方智慧的互补性。文章着重分析了如何在保持文化特色的同时，实现思想的跨文化对话，并就如何在现代生活中汲取东西方智慧提出了具体建议。通过这场跨越时空的对话，我们能够看到不同文明之间的共鸣与互补。',
      summary: '探讨东西方哲学的互补性，分析如何实现跨文化对话与智慧汲取...',
      collections: {
        connect: { id: philosophyCollection.id }
      }
    }
  });

  console.log('Database has been seeded');
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
