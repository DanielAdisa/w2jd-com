import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { moodId, moodName } = req.body;

    if (!moodId || !moodName) {
      return res.status(400).json({ error: 'Mood ID and name are required' });
    }

    try {
      // Use findFirst if moodId is not unique
      const existingRecord = await prisma.imageGeneration.findFirst({
        where: { moodId },
      });

      let updatedRecord;
      if (existingRecord) {
        // Update the existing record's count
        updatedRecord = await prisma.imageGeneration.update({
          where: { id: existingRecord.id }, // Use the unique ID field for updates
          data: { count: { increment: 1 } },
        });
      } else {
        // Create a new record if it doesn't exist
        updatedRecord = await prisma.imageGeneration.create({
          data: { moodId, moodName, count: 1 },
        });
      }

      return res
        .status(200)
        .json({ message: 'Generation count updated successfully', count: updatedRecord.count });
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ error: 'Failed to update generation count' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
