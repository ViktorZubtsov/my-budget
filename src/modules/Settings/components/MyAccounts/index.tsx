import {TextM} from '@salutejs/plasma-ui';
import {H4} from '@salutejs/plasma-web';
import {memo} from 'react';

import {AccountsBadge} from '@/components/AccountsBadge';
import {IAccount} from '@/model';

import {DATA_TEST_ID_ACCOUNT, MAX_ACCOUNT_LENGTH} from '../../constants';
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
                <TextM>
                    {accountsList.length}&nbsp;/&nbsp;{MAX_ACCOUNT_LENGTH}
                </TextM>
            </Header>
            <MyAccountsStyled id={DATA_TEST_ID_ACCOUNT.LIST}>
                {!accountsList?.length && <EmptyText>У вас нет счетов</EmptyText>}
                {accountsList && accountsList.map(({colorCode, id, name}) => <AccountsBadge key={id} $colorCode={colorCode} text={name} size="l" />)}
            </MyAccountsStyled>
        </MyAccountsStyled>
    );
});
