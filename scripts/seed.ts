import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 清理现有数据
  await prisma.article.deleteMany()
  await prisma.collection.deleteMany()

  // 创建合集
  const techCollection = await prisma.collection.create({
    data: {
      name: '技术前沿',
      description: '探索最新技术趋势和深度技术分析',
      coverImage: '/images/covers/ai-future.jpg'
    }
  })

  const thoughtCollection = await prisma.collection.create({
    data: {
      name: '思考随笔',
      description: '关于技术、社会和未来的深度思考',
      coverImage: '/images/covers/modern-thinking.jpg'
    }
  })

  // 创建技术文章
  await prisma.article.create({
    data: {
      title: '深入理解大语言模型：从架构到应用',
      content: '大语言模型（LLM）正在改变我们与技术交互的方式。本文深入探讨了Transformer架构的核心原理，包括自注意力机制、位置编码等关键技术。同时，我们也将分析LLM在实际应用中的优势和局限性，以及未来可能的发展方向。\n\n首先，让我们了解Transformer的基本架构。Transformer模型主要由编码器和解码器两部分组成，其核心是自注意力机制。这种机制允许模型在处理序列数据时，能够动态地关注不同位置的信息。\n\n在实际应用中，LLM展现出了强大的能力，从自然语言处理到代码生成，从创意写作到知识问答。然而，我们也需要注意到它的局限性，比如事实准确性、偏见问题等。\n\n展望未来，LLM技术还有很大的发展空间。包括提高模型的可解释性、降低计算成本、增强特定领域的能力等方向都值得关注。',
      summary: '探讨大语言模型的技术原理、应用现状和未来发展',
      collections: {
        connect: {
          id: techCollection.id
        }
      }
    }
  })

  await prisma.article.create({
    data: {
      title: '云原生架构的演进与实践',
      content: '云原生已经成为现代应用架构的主流选择。本文将分享云原生架构的演进历程，以及在实际项目中的最佳实践。\n\n从单体应用到微服务，从容器化到服务网格，云原生架构经历了几个重要的发展阶段。每个阶段都带来了新的技术范式和解决方案，也带来了新的挑战。\n\n在实践中，我们需要注意以下几个关键点：\n1. 合理的服务拆分粒度\n2. 可靠的服务治理方案\n3. 完善的监控和告警机制\n4. 高效的持续集成和部署流程\n\n同时，我们也要警惕过度设计和复杂化的问题。云原生不是目的，而是手段，最终目标是为业务创造价值。',
      summary: '分享云原生架构的发展历程和实践经验',
      collections: {
        connect: {
          id: techCollection.id
        }
      }
    }
  })

  // 创建思考文章
  await prisma.article.create({
    data: {
      title: '技术创新与人文关怀的平衡',
      content: '在追求技术创新的同时，我们是否忽视了人文关怀？本文将探讨技术发展与人文价值的关系，以及如何在两者之间找到平衡。\n\n技术创新带来了效率的提升和生活方式的改变，但同时也带来了一些值得思考的问题：\n1. 技术是否正在改变人与人之间的关系？\n2. 在追求效率的过程中，我们是否失去了一些重要的人文体验？\n3. 如何确保技术发展的方向符合人类的根本利益？\n\n要解决这些问题，我们需要：\n1. 在技术设计中融入人文考量\n2. 重视用户体验的情感维度\n3. 建立技术伦理的评估机制\n\n技术与人文不是对立的，而是相辅相成的。只有将两者有机结合，才能创造真正有价值的产品和服务。',
      summary: '探讨技术创新与人文关怀的关系，寻找平衡点',
      collections: {
        connect: {
          id: thoughtCollection.id
        }
      }
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
