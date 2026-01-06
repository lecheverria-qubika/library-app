import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET: string = (process.env.JWT_SECRET ?? 'default_secret_change_in_production') as string;
export const JWT_EXPIRES_IN: string = (process.env.JWT_EXPIRES_IN ?? '24h') as string;

