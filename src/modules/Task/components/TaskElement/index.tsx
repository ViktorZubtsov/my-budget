import {accent} from '@salutejs/plasma-core';
import {IconDone} from '@salutejs/plasma-icons';
import {CardContent, h5, MarkedList} from '@salutejs/plasma-ui';
import React, {memo, useMemo} from 'react';

import {AccountsBadge} from '@/components/AccountsBadge';
import {TEST_ID_TASK} from '@/constant/dataTest';
import {IAccount, TAccountsColors, TTask} from '@/model';
import {
    BadgeWrap,
    Content,
    PricesWrap,
    TaskElementMarkedItem,
    TaskElementPrice,
    TaskElementStyled,
} from '@/modules/Task/components/TaskElement/styled';

export interface ITaskItemElementProps {
    task: TTask;
    accountsList: IAccount[];
}

export const TaskElement = memo<ITaskItemElementProps>(({task, accountsList}) => {
    const {name, bankAccount, price, done} = task;

    const currentBankAccount = useMemo(() => accountsList.find(({id}) => id === bankAccount) as IAccount, [bankAccount, accountsList]);

    return (
        <TaskElementStyled data-testid={TEST_ID_TASK.ITEM}>
            <CardContent>
                <Content>
                    <PricesWrap>
                        <MarkedList>
                            <TaskElementMarkedItem data-testid={TEST_ID_TASK.TASK_ITEM_NAME} $isDone={done} style={h5} text={name}>
                                {Boolean(done) && <IconDone size="xs" color={accent} />}
                            </TaskElementMarkedItem>
                        </MarkedList>
                        <TaskElementPrice data-testid={TEST_ID_TASK.TASK_ITEM_PRICE} $isDone={done} currency="rub" stroke={false}>
                            {Number(price)}
                        </TaskElementPrice>
                    </PricesWrap>
                    <BadgeWrap>
                        <AccountsBadge
                            data-testid={TEST_ID_TASK.TASK_ITEM_BADGE}
                            text={currentBankAccount?.name ?? 'Нет названия'}
                            size="l"
                            $isDone={done}
                            $colorCode={currentBankAccount?.colorCode as TAccountsColors}
                        />
                    </BadgeWrap>
                </Content>
            </CardContent>
        </TaskElementStyled>
    );
});
