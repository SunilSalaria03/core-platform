import * as bcrypt from 'bcryptjs';

const DEFAULT_ROUNDS = 12;

export const hashValue = async (value: string, rounds = DEFAULT_ROUNDS) =>
  await bcrypt.hash(value, rounds);

export const compareHash = async (value: string, hash: string) =>
  await bcrypt.compare(value, hash);
