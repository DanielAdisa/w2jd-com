import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const testimonies = await prisma.testimony.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(testimonies);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonies' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const testimony = await prisma.testimony.create({
      data: {
        author: body.author,
        title: body.title,
        content: body.content,
        category: body.category || 'General',
      }
    });
    return NextResponse.json(testimony);
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create testimony' },
      { status: 500 }
    );
  }
}