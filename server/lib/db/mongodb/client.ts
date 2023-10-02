import { MongoClient } from 'mongodb';

const mongodbUrl = String(process.env.MONGODB_URL);
const mongodbClient = new MongoClient(mongodbUrl);

const databaseName = 'TechBoard';

const mongoClient = mongodbClient.db(databaseName);

export default mongoClient;
