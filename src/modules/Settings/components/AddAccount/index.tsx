import {Button, TextField} from '@salutejs/plasma-ui';
import {Select} from '@salutejs/plasma-web';
import {memo, useState} from 'react';

import {AccountsBadge} from '@/components/AccountsBadge';
import {TEST_ID_ACCOUNT} from '@/constant/dataTest';
import {IAccount} from '@/model';
import {MAX_ACCOUNT_LENGTH} from '@/modules/Settings/constants';
import {TAccountParams} from '@/modules/Settings/type';

import {AddAccountStyled} from './styled';

const items = [
    {
        label: <AccountsBadge $colorCode="critical" size="l" text="Красный" />,
        value: 'critical',
    },
    {
        label: <AccountsBadge $colorCode="green" size="l" text="Зеленый" />,
        value: 'green',
    },
    {
        label: <AccountsBadge $colorCode="warning" size="l" text="Оранжевый" />,
        value: 'warning',
    },
    {
        label: <AccountsBadge $colorCode="whiteSecondary" size="l" text="Белый вторичный" />,
        value: 'whiteSecondary',
    },
    {
        label: <AccountsBadge $colorCode="whiteTertiary" size="l" text="Белый третичный" />,
        value: 'whiteTertiary',
    },
    {
        label: <AccountsBadge $colorCode="dark" size="l" text="Черный" />,
        value: 'dark',
    },
];

interface IAddAccountProps {
    accountsList: IAccount[];
    isFetching: boolean;
    onClick: (params: TAccountParams) => void;
}

export const AddAccount = memo<IAddAccountProps>(({accountsList, onClick, isFetching}) => {
    const [colorCode, setValue] = useState(null);
    const [name, setName] = useState('');

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
                items={items}
                onChange={setValue}
                placeholder="Выберите цвет"
                helperText="Цвет"
            />
            <TextField id={TEST_ID_ACCOUNT.NAME} maxLength={30} label="Название счета" onChange={(event) => setName(event.target.value)} />
            <Button
                id={TEST_ID_ACCOUNT.ADD_ACCOUNT}
                isLoading={isFetching}
                onClick={handleClick}
                disabled={!colorCode || !name || Boolean(MAX_ACCOUNT_LENGTH <= accountsList.length)}
                size="s"
            >
                Добавить
            </Button>
        </AddAccountStyled>
    );
});
