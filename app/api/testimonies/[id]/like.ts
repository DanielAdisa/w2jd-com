import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const testimony = await prisma.testimony.update({
      where: { id: params.id },
      data: {
        likes: { increment: 1 }
      }
    });
    return NextResponse.json(testimony);
  } catch (error) {
    console.error('Like update error:', error);
    return NextResponse.json(
      { error: 'Failed to update likes' },
      { status: 500 }
    );
  }
}