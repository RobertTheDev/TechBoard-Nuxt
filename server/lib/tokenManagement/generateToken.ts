import crypto from 'node:crypto';

// This handler generates a unique token using crypto random uuid.
// This handler returns token with an expiration time.

export default async function generateToken() {
  // Get current time in milliseconds.
  const currentTimeInMS = new Date().getTime();

  // Create an expiry time 10 minutes from now.
  const tokenExpiryTime = new Date(currentTimeInMS + 10 * 60 * 1000).getTime();

  // Create a random UUID to use as a token.
  const token = crypto.randomUUID();

  return { token, tokenExpiryTime };
}
