import { ObjectId } from 'mongodb';
import { usersCollection } from '~/server/lib/db/mongodb/collections';

// This handler finds and returns a user by their matching id.

export default async function getUserById(id: string) {
  const user = await usersCollection.findOne({
    _id: new ObjectId(id),
  });

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: `No user was found with that id.`,
    });
  }

  return user;
}
