import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'POST') {
    try {
      const testimony = await prisma.testimony.update({
        where: { id: String(id) },
        data: { likes: { decrement: 1 } }
      });
      return res.status(200).json(testimony);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ error: 'Failed to update likes' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}