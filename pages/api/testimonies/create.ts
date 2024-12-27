
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { author, title, content, category } = req.body;

    if (!author || !title || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const testimony = await prisma.testimony.create({
      data: {
        author,
        title,
        content,
        category: category || 'General',
        likes: 0
      },
    });

    return res.status(201).json(testimony);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Error creating testimony' });
  }
}