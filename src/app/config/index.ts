import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 5000,
  databaseUrl: process.env.DATABASE_URL || '',
  jwt: {
    secret: (process.env.JWT_SECRET || 'secret') as string,
    expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as `${number}${'s'|'m'|'h'|'d'}`,
  },
  bcryptRounds: Number(process.env.BCRYPT_SALT_ROUNDS || 10),
};
