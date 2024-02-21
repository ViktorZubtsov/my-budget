import type {GetServerSideProps} from 'next';

import {$Auth} from '../core/classes/Auth';
import {User} from '../core/classes/User';
import {getAccountKey, getGoalListKey} from '../core/SWRKeys';
import {getGoalsListByUid} from '../modules/Goal/actions/getGoalsListByUid';
import MainGoalsPage from '../modules/Goal/page/MainGoals';
import {getAccountsList} from '../modules/Settings/actions/getAccountsList';

export const getServerSideProps = (async (context) => {
    const session = await $Auth.getAuthSession(context);
    const uid = new User(session).getUid();
    const list = await getAccountsList({uid});
    const goalList = await getGoalsListByUid(uid);

    return {
        props: {
            fallback: {
                [`${getAccountKey(uid)}`]: {accountsList: list},
                [`${getGoalListKey(uid)}`]: {goalList: goalList},
            },
        },
    };
}) satisfies GetServerSideProps;

export default function IndexPage() {
    return <MainGoalsPage />;
}
