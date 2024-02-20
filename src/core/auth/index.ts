import {PrismaAdapter} from '@next-auth/prisma-adapter';
import type {AuthOptions} from 'next-auth';
import GoggleProvider from 'next-auth/providers/google';

import prismaClient from '../prisma';
export const authConfig: AuthOptions = {
    adapter: PrismaAdapter(prismaClient),
    callbacks: {
        async session({session, token, user}) {
            session.user.id = user.id;
            return session;
        },
    },
    pages: {
        signIn: '/auth',
    },
    providers: [
        GoggleProvider({
            // eslint-disable-next-line id-length
            allowDangerousEmailAccountLinking: true,
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
};
