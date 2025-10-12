import {PrismaAdapter} from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import type {AuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import prismaClient from '../prisma';

export const authConfig: AuthOptions = {
    adapter: PrismaAdapter(prismaClient),
    secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-here-change-this-in-production',
    debug: process.env.NODE_ENV === 'development',
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({session, token}) {
            if (token) {
                session.user.id = token.id;
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth',
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prismaClient.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user || !user.password) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    email: user.email,
                    id: user.id,
                    name: user.name,
                };
            },
            credentials: {
                email: {label: 'Email', type: 'email'},
                password: {label: 'Password', type: 'password'},
            },
            name: 'credentials',
        }),
    ],
    session: {
        strategy: 'jwt',
    },
};
