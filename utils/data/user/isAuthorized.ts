'server only';

import config from '@/config';
import { db } from '@/db/prisma';
import { clerkClient } from '@clerk/nextjs/server';

export const isAuthorized = async (
  userId: string
): Promise<{ authorized: boolean; message: string }> => {
  console.log('GET HIT');
  if (!config?.payments?.enabled) {
    console.log('Payments are disabled');
    return {
      authorized: true,
      message: 'Payments are disabled',
    };
  }

  const result = (await clerkClient()).users.getUser(userId);

  if (!result) {
    return {
      authorized: false,
      message: 'User not found',
    };
  }

  try {
    const user = await db.user.findUnique({
      where: {
        userId: userId,
      },
      select: {
        subscriptions: {
          where: {
            endDate: {
              gte: new Date(),
            },
            status: 'active',
          },
        },
      },
    });

    if (user?.subscriptions?.length > 0) {
      return {
        authorized: true,
        message: 'User is authorized',
      };
    }

    return {
      authorized: false,
      message: 'User is not subscribed',
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        authorized: false,
        message: error.message,
      };
    }
    return {
      authorized: false,
      message: 'An error occurred while checking authorization',
    };
  }
};
