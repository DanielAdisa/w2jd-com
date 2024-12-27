import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { author, title, content, category = 'General' } = req.body;
      
      const testimony = await prisma.testimony.create({
        data: {
          author,
          title,
          content,
          category,
          likes: 0
        }
      });
      
      return res.status(201).json(testimony);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ error: 'Failed to create testimony' });
    }
  }

  if (req.method === 'GET') {
    try {
      const testimonies = await prisma.testimony.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(testimonies);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ error: 'Failed to fetch testimonies' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}