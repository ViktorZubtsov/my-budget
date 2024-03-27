import {useContext} from 'react';
import {toast} from 'react-toastify';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import errorHandler from '@/core/exceptions/ErrorHandler';
import {getAccountKey} from '@/core/SWRKeys';
import {IAccount} from '@/model';
import {AuthContext} from '@/modules/Auth/context';
import {updateAccounts} from '@/modules/Settings/actions/updateAccounts';
import {TAccountParams} from '@/modules/Settings/type';

interface IUseAccountResult {
    accountsList: IAccount[];
    isMutating: boolean;
    addAccount: ({name, colorCode}: TAccountParams) => void;
}

export const useAccount = (): IUseAccountResult => {
    const {userId} = useContext(AuthContext);
    const {data} = useSWR<IAccount[]>(getAccountKey(userId), {revalidateOnMount: true});

    const {trigger, isMutating} = useSWRMutation(getAccountKey(userId), updateAccounts, {
        onError: (err) => errorHandler(err),
        onSuccess: () => toast.success('Счет добавлен', {theme: 'dark'}),
    });

    const addAccount = (currentAccount: TAccountParams) => {
        return trigger(currentAccount);
    };

    return {
        accountsList: data ?? [],
        addAccount,
        isMutating,
    };
};
