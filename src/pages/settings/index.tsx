import type {GetServerSideProps} from 'next';

import {$Auth} from '@/core/classes/Auth';
import {User} from '@/core/classes/User';
import {getAccountKey} from '@/core/SWRKeys';
import {IAccount} from '@/model';
import {getAccountsList} from '@/modules/Settings/actions/getAccountsList';
import SettingsPage from '@/modules/Settings/page/SettingsPage';

type TProps = {
    fallback: {
        [key: string]: IAccount[];
    };
};

export const getServerSideProps = (async (context) => {
    const session = await $Auth.getAuthSession(context);
    const uid = new User(session).getUid();

    return {
        props: {
            fallback: {
                [`${getAccountKey(uid)}`]: [],
            },
        },
    };
}) satisfies GetServerSideProps<TProps>;

export default function Settings() {
    return <SettingsPage />;
}
