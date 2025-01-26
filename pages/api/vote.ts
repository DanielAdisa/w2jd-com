import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { vote } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    if (typeof vote !== 'boolean') {
      return res.status(400).json({ error: 'Invalid vote value' });
    }

    try {
      // Check if the IP address already exists in the database
      const existingVote = await prisma.vote.findFirst({
        where: {
          ipAddress: Array.isArray(ip) ? ip[0] : ip || 'unknown',
        },
      });

      if (existingVote) {
        return res.status(409).json({ error: 'You have already voted.' });
      }

      // Create a new vote
      const newVote = await prisma.vote.create({
        data: {
          vote,
          ipAddress: Array.isArray(ip) ? ip[0] : ip || 'unknown',
        },
      });
      return res.status(201).json(newVote);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ error: 'Failed to add vote' });
    }
  } else if (req.method === 'GET') {
    try {
      const votes = await prisma.vote.findMany();
      return res.status(200).json(votes);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ error: 'Failed to fetch votes' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}