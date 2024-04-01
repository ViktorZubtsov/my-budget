import {Button, TextField} from '@salutejs/plasma-ui';
import {Select} from '@salutejs/plasma-web';
import {memo, useMemo, useState} from 'react';

import {AccountsBadge} from '@/components/AccountsBadge';
import {TEST_ID_ACCOUNT} from '@/constant/dataTest';
import {IAccount, TAccountsColors} from '@/model';
import {ACCOUNTS_OPTIONS} from '@/modules/Settings/components/AddAccount/constants';
import {MAX_ACCOUNT_LENGTH, MAX_ACCOUNT_NAME_LENGTH} from '@/modules/Settings/constants';
import {TAccountParams} from '@/modules/Settings/type';

import {AddAccountStyled} from './styled';

interface IAddAccountProps {
    accountsList: IAccount[];
    isFetching: boolean;
    onClick: (params: TAccountParams) => void;
}

export const AddAccount = memo<IAddAccountProps>(({accountsList, onClick, isFetching}) => {
    const [colorCode, setValue] = useState(null);
    const [name, setName] = useState('');
    const buttonIsDisabled = !colorCode || !name || Boolean(MAX_ACCOUNT_LENGTH <= accountsList.length);

    const accounts = useMemo(() => {
        return ACCOUNTS_OPTIONS.map(({text, value}) => {
            return {
                label: <AccountsBadge $colorCode={value as TAccountsColors} size="l" text={text} />,
                value,
            };
        });
    }, []);

    const handleClick = () => {
        onClick({
            colorCode: colorCode ?? 'green',
            name,
        });
    };
    return (
        <AddAccountStyled>
            <Select
                id={TEST_ID_ACCOUNT.SELECT}
                value={colorCode}
                // @ts-ignore
                items={accounts}
                onChange={setValue}
                placeholder="Выберите цвет"
                helperText="Цвет"
            />
            <TextField
                id={TEST_ID_ACCOUNT.NAME}
                maxLength={MAX_ACCOUNT_NAME_LENGTH}
                label="Название счета"
                onChange={(event) => setName(event.target.value)}
            />
            <Button
                text="Добавить"
                id={TEST_ID_ACCOUNT.ADD_ACCOUNT}
                data-testid={TEST_ID_ACCOUNT.ADD_ACCOUNT}
                isLoading={isFetching}
                onClick={handleClick}
                disabled={buttonIsDisabled}
                size="s"
            />
        </AddAccountStyled>
    );
});
