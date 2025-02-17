import { db } from '@/db/prisma';
import { isAuthorized } from '@/utils/data/user/isAuthorized';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId || !(await isAuthorized(clerkUserId))) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get user from database based on Clerk user ID
    const dbUser = await db.user.findUnique({
      where: {
        userId: clerkUserId,
      },
    });

    if (!dbUser) {
      return new NextResponse('User not found', { status: 404 });
    }

    const movies = await db.movie.findMany({
      where: {
        userId: dbUser.id,
      },
      orderBy: {
        id: 'desc',
      },
    });

    console.log('[get-movies] movies: ', movies);

    return NextResponse.json(movies);
  } catch (error) {
    console.error('[MOVIES_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
