import {accent} from '@salutejs/plasma-core';
import {IconDone} from '@salutejs/plasma-icons';
import {Badge, Card, CardContent, h5, MarkedItem, MarkedList, Price, textS} from '@salutejs/plasma-ui';
import classNames from 'classnames';
import React, {memo, useMemo} from 'react';

import {ACCOUNTS_COLORS} from '../../../../../constant';
import {IAccount, TAccountsColors, TTask} from '../../../../../model';

import styles from './styles.module.scss';

interface ITaskItemElementProps {
    task: TTask;
    accountsList: IAccount[];
    className?: string;
}

export const TaskItemElement = memo<ITaskItemElementProps>(({task, accountsList, className}) => {
    const {name, bankAccount, price, done} = task;

    const currentBankAccount = useMemo(() => accountsList.find(({id}) => id === bankAccount) as IAccount, [bankAccount, accountsList]);

    return (
        <Card className={classNames(styles.TaskItemElement, className)}>
            <CardContent>
                <div className={styles.Content}>
                    <div className={styles.PricesWrap}>
                        <MarkedList>
                            <MarkedItem style={h5} className={styles[Boolean(done) ? 'LineThrough' : '']} text={name}>
                                {Boolean(done) && <IconDone size="xs" color={accent} />}
                            </MarkedItem>
                        </MarkedList>
                        <Price className={styles[done ? 'LineThrough' : '']} currency="rub" stroke={false}>
                            {Number(price)}
                        </Price>
                    </div>
                    <div className={styles.Badge}>
                        <Badge
                            className={styles[Boolean(done) ? 'LineThrough' : '']}
                            text={currentBankAccount?.name ?? 'Нет названия'}
                            size="l"
                            style={{background: ACCOUNTS_COLORS[currentBankAccount?.colorCode ?? ('green' as TAccountsColors)], ...textS}}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
});
