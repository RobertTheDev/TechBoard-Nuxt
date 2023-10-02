import mongoClient from "./client";

export const jobPostsCollection = mongoClient.collection("jobPosts");
