import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create sample groups
  const groups = await Promise.all([
    prisma.group.create({
      data: {
        name: 'Grief & Loss Support',
        description: 'A safe space to share and heal from loss',
        category: 'Grief & Loss',
        isPrivate: false,
      },
    }),
    prisma.group.create({
      data: {
        name: 'Recovery Warriors',
        description: 'Supporting each other through addiction recovery',
        category: 'Addiction Recovery',
        isPrivate: false,
      },
    }),
    prisma.group.create({
      data: {
        name: 'Anxiety & Depression Support',
        description: 'Understanding and managing anxiety and depression together',
        category: 'Anxiety & Depression',
        isPrivate: false,
      },
    }),
    prisma.group.create({
      data: {
        name: 'Trauma Healing Circle',
        description: 'A compassionate community for trauma survivors',
        category: 'Trauma & PTSD',
        isPrivate: false,
      },
    }),
  ])

  console.log(`Created ${groups.length} groups`)

  // Create sample resources
  const resources = await Promise.all([
    prisma.resource.create({
      data: {
        title: 'Understanding the Stages of Grief',
        description: 'Learn about the five stages of grief and how to navigate them',
        category: 'Grief & Loss',
        url: 'https://example.com/grief-stages',
        type: 'guide',
      },
    }),
    prisma.resource.create({
      data: {
        title: 'Mindfulness Meditation for Anxiety',
        description: 'Practical mindfulness techniques to reduce anxiety',
        category: 'Anxiety & Depression',
        url: 'https://example.com/mindfulness',
        type: 'article',
      },
    }),
    prisma.resource.create({
      data: {
        title: 'SAMHSA National Helpline',
        description: '1-800-662-4357 - Free, confidential, 24/7 support',
        category: 'Addiction Recovery',
        url: 'tel:1-800-662-4357',
        type: 'hotline',
      },
    }),
    prisma.resource.create({
      data: {
        title: 'Trauma Recovery: A Guide',
        description: 'Comprehensive guide to understanding and healing from trauma',
        category: 'Trauma & PTSD',
        url: 'https://example.com/trauma-guide',
        type: 'guide',
      },
    }),
    prisma.resource.create({
      data: {
        title: 'Building Healthy Relationships',
        description: 'Tips for creating and maintaining healthy relationships',
        category: 'Relationship Issues',
        url: 'https://example.com/relationships',
        type: 'article',
      },
    }),
  ])

  console.log(`Created ${resources.length} resources`)
  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
