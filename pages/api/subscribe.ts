import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    try {
      const existingSubscriber = await prisma.subscriber.findUnique({
        where: { email },
      });

      if (existingSubscriber) {
        return res.status(409).json({ error: 'You have already subscribed.' });
      }

      const newSubscriber = await prisma.subscriber.create({
        data: {
          email,
        },
      });
      return res.status(201).json(newSubscriber);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ error: 'Failed to add subscriber' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}