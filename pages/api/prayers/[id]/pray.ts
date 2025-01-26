import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'POST') {
    try {
      const prayer = await prisma.prayer.update({
        where: { id: Number(id) },
        data: { praying: { increment: 1 } },
      });
      return res.status(200).json(prayer);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ error: 'Failed to update praying count' });
    }
  }

  res.status(405).end(`Method ${req.method} Not Allowed`);
}