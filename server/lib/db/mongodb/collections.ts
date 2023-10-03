import mongoClient from './client';

export const jobPostsCollection = mongoClient.collection('jobPosts');

export const companiesCollection = mongoClient.collection('companies');
