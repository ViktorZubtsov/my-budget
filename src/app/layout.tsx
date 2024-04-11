import {redirect} from 'next/navigation';
import {ReactNode} from 'react';
import {Suspense} from 'react';

import Loading from '@/app/loading';
import {$Auth} from '@/core/classes/Auth';
import {User} from '@/core/classes/User';
import {RootProvider} from '@/core/provider/Root';
import {SWRProvider} from '@/core/provider/SWRProvider';
import {getAccountKey, getArchiveGoalListKey, getGoalListKey} from '@/core/SWRKeys';
import {getGoalsListByUid} from '@/modules/Goal/actions/getGoalsListByUid';
import {getAccountsList} from '@/modules/Settings/actions/getAccountsList';

export default async function RootLayout({children}: {children: ReactNode}) {
    const session = await $Auth.getSession();
    const uid = new User(session).getUid();

    const list = await getAccountsList({uid});
    const goalList = await getGoalsListByUid(uid);

    return (
        <html lang="ru">
            <head>
                <title>Мой бюджет</title>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="rgba(20,116,70,0.6)" />
            </head>
            <body>
                <Suspense fallback={<Loading />}>
                    <SWRProvider
                        fallback={{
                            [`${getAccountKey(uid)}`]: list,
                            [`${getGoalListKey(uid)}`]: goalList,
                            [`${getArchiveGoalListKey(uid)}`]: [],
                        }}
                    >
                        <RootProvider>{children}</RootProvider>
                    </SWRProvider>
                </Suspense>
            </body>
        </html>
    );
}
