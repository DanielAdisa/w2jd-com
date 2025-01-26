import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const comments = await prisma.prayerComment.findMany({
        where: { prayerId: Number(id) },
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
      const newComment = await prisma.prayerComment.create({
        data: {
          author,
          content,
          prayerId: Number(id),
          createdAt: new Date().toISOString(), // Ensure createdAt is a valid date string
        }
      });
      return res.status(201).json(newComment);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ error: 'Failed to add comment' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { commentId } = req.body;
      await prisma.prayerComment.delete({
        where: { id: Number(commentId) }
      });
      return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ error: 'Failed to delete comment' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}