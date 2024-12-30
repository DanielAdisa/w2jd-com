import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const testimony = await prisma.testimony.findUnique({
        where: { id: String(id) }
      });
      if (!testimony) {
        return res.status(404).json({ error: 'Testimony not found' });
      }
      return res.status(200).json(testimony);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ error: 'Failed to fetch testimony' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { author, title, content, category = 'General' } = req.body;
      const testimony = await prisma.testimony.update({
        where: { id: String(id) },
        data: {
          author,
          title,
          content,
          category,
        }
      });
      return res.status(200).json(testimony);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ error: 'Failed to update testimony' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.testimony.delete({
        where: { id: String(id) }
      });
      return res.status(200).json({ message: 'Testimony deleted' });
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ error: 'Failed to delete testimony' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}