'server only';

import { db } from '@/db/prisma';
import { userCreateProps } from '@/utils/types';

export const userCreate = async ({
  email,
  first_name,
  last_name,
  profile_image_url,
  user_id,
}: userCreateProps) => {
  try {
    console.log('info', {
      email,
      firstName: first_name,
      lastName: last_name,
      profileImageUrl: profile_image_url,
      userId: user_id,
    });
    const result = await db.user.create({
      data: {
        email,
        firstName: first_name,
        lastName: last_name,
        profileImageUrl: profile_image_url,
        userId: user_id,
      },
    });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
    throw new Error('Failed to create user');
  }
};
