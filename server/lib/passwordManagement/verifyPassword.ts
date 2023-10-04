import { verify } from 'argon2';

// This function uses argon2 to verify and check the inputted password is correct.

export default async function verifyPassword(
  password: string,
  inputtedPassword: string,
) {
  return await verify(password, inputtedPassword);
}
