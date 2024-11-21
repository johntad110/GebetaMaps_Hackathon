import { getRandomProperties } from '@/actions/random-properties';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const properties = await getRandomProperties();

    return NextResponse.json({ properties });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return new NextResponse('Error fetching properties', { status: 500 });
  }
}
