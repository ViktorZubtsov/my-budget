import {TextM} from '@salutejs/plasma-ui';
import {H4} from '@salutejs/plasma-web';
import {memo} from 'react';

import {AccountsBadge} from '@/components/AccountsBadge';
import {TEST_ID_ACCOUNT, TEST_MY_ACCOUNTS} from '@/constant/dataTest';
import {IAccount} from '@/model';
import {EMPTY_TEXT} from '@/modules/Settings/components/MyAccounts/constants';
import {MAX_ACCOUNT_LENGTH} from '@/modules/Settings/constants';

import {EmptyText, Header, MyAccountsStyled} from './styled';

interface IMyAccountsProps {
    accountsList: IAccount[];
}

export const MyAccounts = memo<IMyAccountsProps>(({accountsList}) => {
    return (
        <MyAccountsStyled>
            <H4>Список моих счетов</H4>
            <Header>
                <TextM>Количесвто:</TextM>
                <TextM data-testid={TEST_MY_ACCOUNTS.COUNTER}>
                    {accountsList.length} / {MAX_ACCOUNT_LENGTH}
                </TextM>
            </Header>
            <MyAccountsStyled data-testid={TEST_ID_ACCOUNT.LIST}>
                {!accountsList?.length && <EmptyText data-testid={TEST_MY_ACCOUNTS.EMPTY_TEXT}>{EMPTY_TEXT}</EmptyText>}
                {accountsList && accountsList.map(({colorCode, id, name}) => <AccountsBadge key={id} $colorCode={colorCode} text={name} size="l" />)}
            </MyAccountsStyled>
        </MyAccountsStyled>
    );
});
