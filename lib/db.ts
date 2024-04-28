import { PrismaClient } from '@prisma/client';

declare global {
    // eslint-disable-next-line no-unused-vars,vars-on-top,no-var
    let prisma: PrismaClient | undefined;
}

// eslint-disable-next-line no-undef,import/prefer-default-export
export const db = globalThis.prisma || new PrismaClient();

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
