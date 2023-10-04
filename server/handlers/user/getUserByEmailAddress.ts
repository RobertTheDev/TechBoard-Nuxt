import { usersCollection } from '~/server/lib/db/mongodb/collections';

// This handler finds and returns a user by their matching email address.

export default async function getUserByEmailAddress(emailAddress: string) {
  const user = await usersCollection.findOne({
    emailAddress,
  });

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: `No user was found with the email address ${emailAddress}.`,
    });
  }

  return user;
}
