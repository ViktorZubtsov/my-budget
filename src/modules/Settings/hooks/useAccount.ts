import {toast} from 'react-toastify';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import errorHandler from '../../../core/exceptions/ErrorHandler';
import {getAccountKey} from '../../../core/SWRKeys';
import {IAccount} from '../../../model';
import {updateAccounts} from '../actions/updateAccounts';
import {TAccountParams} from '../type';

interface IUseAccountResult {
    accountsList: IAccount[];
    isMutating: boolean;
    addAccount: ({name, colorCode}: TAccountParams) => void;
}

export const useAccount = (): IUseAccountResult => {
    const userId = 'clpdnwkhm0000dgnrlljhvj2e';
    const {data} = useSWR<{accountsList: IAccount[]}>(getAccountKey(userId), {revalidateOnMount: false});

    const {trigger, isMutating, error} = useSWRMutation(getAccountKey(userId), updateAccounts, {
        onError: (err) => errorHandler(err),
        onSuccess: () => toast.success('Счет добавлен', {theme: 'dark'}),
    });

    const addAccount = (currentAccount: TAccountParams) => {
        return trigger(currentAccount);
    };

    return {
        accountsList: data?.accountsList ?? [],
        addAccount,
        isMutating,
    };
};