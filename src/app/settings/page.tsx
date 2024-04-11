import {redirect} from 'next/navigation';

import {TEST_USER_ID} from '@/constant';
import {$Auth} from '@/core/classes/Auth';
import SettingsPage from '@/modules/Settings/page/SettingsPage';

export default async function Settings() {
    const session = await $Auth.getSession();

    if (!TEST_USER_ID && !session) {
        return redirect('/auth');
    }

    return <SettingsPage />;
}
