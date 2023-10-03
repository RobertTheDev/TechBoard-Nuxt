import mongoClient from './client';

// Below are the mongoDB collection names to be used to query collection in the mongoDB database.

export const companiesCollection = mongoClient.collection('companies');

export const companyOwnersCollection = mongoClient.collection('companyOwners');

export const jobPostsCollection = mongoClient.collection('jobPosts');

export const usersCollection = mongoClient.collection('users');
