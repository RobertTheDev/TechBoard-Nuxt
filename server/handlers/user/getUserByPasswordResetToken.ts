import { usersCollection } from '~/server/lib/db/mongodb/collections';

// This handler finds and returns a user by their matching password reset token.

export default async function getUserByPasswordResetToken(
  passwordResetToken: string,
) {
  const user = await usersCollection.findOne({
    passwordResetToken,
  });

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: `No user was found with the password reset token.`,
    });
  }

  return user;
}
