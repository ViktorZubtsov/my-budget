import NextAuth from 'next-auth';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Session {
        user: {
            id: string;
        } & DefaultSession['user'];
    }
}
