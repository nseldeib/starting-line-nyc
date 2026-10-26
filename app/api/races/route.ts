import { NextResponse, type NextRequest } from 'next/server';
import { parseFilters } from '@/app/lib/filters';
import { findRaces } from '@/app/lib/races';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const params: Record<string, string> = {};
  request.nextUrl.searchParams.forEach((value, key) => {
    params[key] = key in params ? `${params[key]},${value}` : value;
  });
  const filters = parseFilters(params);
  const races = await findRaces(filters);
  return NextResponse.json({ filters, count: races.length, races });
}
