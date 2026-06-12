// Crypto helper
import * as bcrypt from 'bcryptjs';

const DEFAULT_ROUNDS = 12;

// hash value
export const hashValue = async (value: string, rounds = DEFAULT_ROUNDS) =>
  await bcrypt.hash(value, rounds);

// compare hash
export const compareHash = async (value: string, hash: string) =>
  await bcrypt.compare(value, hash);
