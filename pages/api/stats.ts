import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const totalImagesGenerated = await prisma.imageGeneration.aggregate({
      _sum: {
        count: true,
      },
    });

    const totalSubscribers = await prisma.subscriber.count();
    const totalVotes = await prisma.vote.count();
    const totalPrayers = await prisma.prayer.count() + await prisma.prayerComment.count();
    const totalComments = await prisma.comment.count() + await prisma.prayerComment.count();

    res.status(200).json({
      totalImagesGenerated: totalImagesGenerated._sum.count || 0,
      totalSubscribers,
      totalVotes,
      totalPrayers,
      totalComments
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
}