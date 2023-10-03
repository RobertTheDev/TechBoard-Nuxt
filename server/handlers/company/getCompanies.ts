import { companiesCollection } from '~/server/lib/db/mongodb/collections';

// This handler finds and returns all the companies from the db.

export default async function createJobPost() {
  return await companiesCollection.find().toArray();
}
