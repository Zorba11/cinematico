'server only';
import { db } from '@/db/prisma';
import { userUpdateProps } from '@/utils/types';
import { cookies } from 'next/headers';

export const userUpdate = async ({
  email,
  first_name,
  last_name,
  profile_image_url,
  user_id,
}: userUpdateProps) => {
  try {
    const result = await db.user.update({
      where: {
        userId: user_id,
      },
      data: {
        email,
        firstName: first_name,
        lastName: last_name,
        profileImageUrl: profile_image_url,
      },
    });

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
