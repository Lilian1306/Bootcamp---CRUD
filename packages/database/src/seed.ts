import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear colecciones
  const highRangeCollection = await prisma.collection.create({
    data: {
      name: 'highRange',
      description: 'High-end devices',
    },
  });

  const midRangeCollection = await prisma.collection.create({
    data: {
      name: 'midRange',
      description: 'Mid-range devices',
    },
  });

  // Crear productos
  const products = [
    {
      name: 'iPhone 15 Pro',
      price: 999.99,
      image: 'url',
      description: "iPhone 15 Pro has the longest optical zoom in iPhone ever",
      variants: {
        create: [
          { capacity: '128GB', color: 'Natural Titanium', price: 2999.99 },
        ],
      },
      collections: {
        connect: { id: highRangeCollection.id },
      },
    },
    {
      name: 'Pixel 9 Pro XL',
      price: 1199.99,
      image: 'url',
      description: 'Meet Pixel 9 Pro XL with Gemini. It has a sleek, stunning design, and it’s the most powerful Pixel yet',
      variants: {
        create: [
          { capacity: '256GB', color: 'Obsidian', price: 1199.99 },
        ],
      },
      collections: {
        connect: { id: highRangeCollection.id },
      },
    },
    {
      name: 'Samsung Galaxy S24 Ultra',
      price: 1299.99,
      image: 'url',
      description: 'Unleash new ways to create, connect and more with Samsung Galaxy S24 Ultra. Epic, just like that',
      variants: {
        create: [
          { capacity: '512GB', color: 'Green', price: 1299.99 },
        ],
      },
      collections: {
        connect: { id: highRangeCollection.id },
      },
    },
    {
      name: 'Samsung Galaxy Z Flip6',
      price: 1999.99,
      image: 'url',
      description: 'Unlock your creativity with the tiny but mighty Galaxy Z Flip6',
      variants: {
        create: [
          { capacity: '256GB', color: 'Blue', price: 1999.99 },
        ],
      },
      collections: {
        connect: { id: highRangeCollection.id },
      },
    },
    {
      name: 'Xiaomi Redmi Note 12',
      price: 299.99,
      image: 'url',
      description: 'AI-powered main camera and stun loved ones in video calls with the 8MP front camera.',
      variants: {
        create: [
          {  capacity: '128GB', color: 'Graphite Gray', price: 299.99 },
        ],
      },
      collections: {
        connect: { id: midRangeCollection.id },
      },
    },
    {
      name: 'Samsung Galaxy A54',
      price: 349.99,
      image: 'url',
      description: 'Packed with amazing capabilities, Galaxy A35 5G is designed to bring out the best in every moment',
      variants: {
        create: [
          { capacity: '128GB', color: 'Awesome Black', price: 349.99 },
        ],
      },
      collections: {
        connect: { id: midRangeCollection.id },
      },
    },
    {
      name: 'Moto g 5G',
      price: 349.99,
      image: 'url',
      description: 'With an immersive display and multidimensional sound, moto g 5G takes your movies, shows, and games to the next level',
      variants: {
        create: [
          { capacity: '128GB', color: 'Sage Green', price: 299.99 },
        ],
      },
      collections: {
        connect: { id: midRangeCollection.id },
      },
    },
    {
      name: 'iPhone SE (3rd gen)',
      price: 349.99,
      image: 'url',
      description: 'Lightning-fast A15 Bionic chip and fast 5G.1 Big-time battery life and a superstar camera',
      variants: {
        create: [
          { capacity: '64GB', color: 'Starlight', price: 499.99 },
        ],
      },
      collections: {
        connect: { id: midRangeCollection.id },
      },
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: {
        ...product,
        variants: {
          create: product.variants.create,
        },
        collections: {
          connect: product.collections.connect,
        },
      },
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch(e => {
    console.error(e);
    alert('Ocurrió un error. Por favor, intenta de nuevo.');
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
