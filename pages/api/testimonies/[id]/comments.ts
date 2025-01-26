import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const comments = await prisma.comment.findMany({
        where: { testimonyId: String(id) },
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(comments);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ error: 'Failed to fetch comments' });
    }
  } else if (req.method === 'POST') {
    try {
      const { author, content } = req.body;
      const newComment = await prisma.comment.create({
        data: {
          author,
          content,
          testimonyId: String(id),
          createdAt: new Date().toISOString(), // Ensure createdAt is a valid date string
        }
      });
      return res.status(201).json(newComment);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ error: 'Failed to add comment' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}