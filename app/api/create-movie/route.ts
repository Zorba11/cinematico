import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { movie, users } from '@/db/schema';
import { createMovieSchema } from '@/lib/validations/movie';
import { eq } from 'drizzle-orm';
import { db } from '@/db/drizzle';
import { user } from '@/db/migrations/schema';
import { isAuthorized } from '@/utils/data/user/isAuthorized';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    // const isAuthorizedUser = await isAuthorized(userId!);

    // if (isAuthorizedUser.authorized === false) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    // Validate request body
    const validatedData = createMovieSchema.parse(body);

    // Get user ID from database based on Clerk user ID
    const dbUser = await db.query.users.findFirst({
      where: eq(users.userId, userId),
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create movie
    const [newMovie] = await db
      .insert(movie)
      .values({
        userId: dbUser.id,
        prompt: validatedData.moviePrompt,
        promptCharacterCount: validatedData.promptCharacterCount,
        promptCharacterCountLimit: validatedData.promptCharacterCountLimit,
        storyStructureStyle: validatedData.storyStructureStyle,
        animationStyle: validatedData.animationStyle,
        title: `Movie ${Date.now()}`, // Placeholder title, can be updated later
        isAllAssetReady: false,
      })
      .returning();

    console.log('[create-movie] new movie created: ', newMovie);

    return NextResponse.json(newMovie);
  } catch (error: any) {
    console.error('Error creating movie:', error);
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
