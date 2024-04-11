import {redirect} from 'next/navigation';

import {TEST_USER_ID} from '@/constant';
import {$Auth} from '@/core/classes/Auth';
import MainGoalsPage from '@/modules/Goal/page/MainGoals';

export default async function Home() {
    const session = await $Auth.getSession();

    if (!TEST_USER_ID && !session) {
        return redirect('/auth');
    }

    return <MainGoalsPage />;
}
