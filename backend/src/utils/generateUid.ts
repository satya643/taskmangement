import crypto from 'crypto';

/**
 * Generates a random UID of specified length with alphanumeric and special characters.
 * Useful for public-facing identifiers that are harder to guess than sequential IDs.
 */
export const generateRandomUid = (length: number = 18): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};
