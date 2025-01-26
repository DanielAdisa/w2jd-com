import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid prayer request ID' });
  }

  switch (req.method) {
    case 'GET':
      return handleGet(req, res, id);
    case 'PUT':
      return handlePut(req, res, id);
    case 'DELETE':
      return handleDelete(req, res, id);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    const prayer = await prisma.prayer.findUnique({
      where: { id: Number(id) },
      include: { comments: true },
    });
    if (!prayer) {
      return res.status(404).json({ error: 'Prayer request not found' });
    }
    return res.status(200).json(prayer);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Failed to fetch prayer request' });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    const { title, content, author, isPublic, category } = req.body;
    const prayer = await prisma.prayer.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        author,
        isPublic,
        category,
      },
    });
    return res.status(200).json(prayer);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Failed to update prayer request' });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    await prisma.prayer.delete({
      where: { id: Number(id) },
    });
    return res.status(200).json({ message: 'Prayer request deleted' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Failed to delete prayer request' });
  }
}