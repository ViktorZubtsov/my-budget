import {v4} from 'uuid';

import {TAccountParams} from '@/modules/Settings/type';

export async function updateAccounts(url: string, {arg}: {arg: TAccountParams}) {
    const {colorCode, name} = arg;

    await fetch(url, {
        body: JSON.stringify({
            colorCode,
            id: v4(),
            name,
        }),
        method: 'POST',
    });
}
