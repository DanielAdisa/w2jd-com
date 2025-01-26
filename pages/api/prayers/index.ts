import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { category } = req.query;

      const prayers = await prisma.prayer.findMany({
        where: {
          isPublic: true,
          ...(category && category !== 'all' ? { category: String(category) } : {}),
        },
        include: { comments: true },
        orderBy: { createdAt: 'desc' },
      });

      res.status(200).json(prayers);

    } catch (error) {
      console.error('Error fetching prayers:', error);
      res.status(500).json({ error: 'Failed to fetch prayer requests' });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === 'POST') {
    try {
      const { title, content, author, isPublic, category } = req.body;

      if (!title || !content || !author) {
        return res.status(400).json({ error: 'Missing required fields: title, content, or author' });
      }

      const newPrayer = await prisma.prayer.create({
        data: {
          title,
          content,
          author,
          isPublic: isPublic ?? true,
          category: category || 'other',
          createdAt: new Date(),
        },
      });

      res.status(201).json(newPrayer);

    } catch (error) {
      console.error('Error creating prayer:', error);
      res.status(500).json({ error: 'Failed to create prayer request' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}