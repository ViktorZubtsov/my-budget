import {H3} from '@salutejs/plasma-ui';
import React, {memo} from 'react';

import {IAccount} from '@/model';
import {AddAccount} from '@/modules/Settings/components/AddAccount';
import {MyAccounts} from '@/modules/Settings/components/MyAccounts';
import {TAccountParams} from '@/modules/Settings/type';

import {AccountsCardStyled, Content} from './styled';

interface IAccountsCardProps {
    accountsList: IAccount[];
    addAccount: (data: TAccountParams) => void;
    isFetching: boolean;
}

export const AccountsCard = memo<IAccountsCardProps>(({accountsList, addAccount, isFetching}) => {
    return (
        <AccountsCardStyled p="10x">
            <Content>
                <H3>Добавить Счета</H3>
                <MyAccounts accountsList={accountsList} />
                <AddAccount accountsList={accountsList} isFetching={isFetching} onClick={addAccount} />
            </Content>
        </AccountsCardStyled>
    );
});
