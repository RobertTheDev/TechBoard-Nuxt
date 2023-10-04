import { hash } from 'argon2';

// This function uses argon2 to hash a user's password.

export default async function hashPassword(password: string) {
  return await hash(password);
}
