import {GetServerSidePropsContext} from 'next';
import {getSession} from 'next-auth/react';

class Auth {
    getAuthSession(context: GetServerSidePropsContext) {
        return getSession(context);
    }
}

export const $Auth = new Auth();
