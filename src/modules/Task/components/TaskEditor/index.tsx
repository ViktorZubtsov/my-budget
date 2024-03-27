import {yupResolver} from '@hookform/resolvers/yup';
import {Button, TextField} from '@salutejs/plasma-ui';
import {Select} from '@salutejs/plasma-web';
import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

import {AccountsBadge} from '@/components/AccountsBadge';
import {ErrorField} from '@/components/Field/Error';
import {SheetModal} from '@/components/SheetModal';
import {IAccount, TAccountsColors, TTask} from '@/model';
import {AccountsCard} from '@/modules/Settings/components/AccountsCard';
import {TAccountParams} from '@/modules/Settings/type';
import {TASK_ERROR, TASK_FIELDS_SCHEMA} from '@/modules/Task/constants';

import {TaskEditorContent, TaskEditorFooter, TaskEditorForm} from './styled';

export type TTaskFields = yup.InferType<typeof TASK_FIELDS_SCHEMA>;

interface ITaskEditorProps {
    accountsList: IAccount[];
    isOpen: boolean;
    onClose: () => void;
    title: string;
    isFetching: boolean;
    isAccountsFetching: boolean;
    addAccount: (data: TAccountParams) => void;
    isEdit: boolean;
    defaultValues?: {
        name: string;
        price: number;
        bankAccount: TTask['bankAccount'];
    };
    onSubmit: (params: TTaskFields) => void;
}

export const TaskEditor = memo<ITaskEditorProps>(
    ({isOpen, isFetching, isAccountsFetching, onClose, title, isEdit, defaultValues, onSubmit, accountsList, addAccount}) => {
        const {
            name: defaultName,
            price: defaultPrice,
            bankAccount: defaultBankAccount,
        } = defaultValues ?? {
            bankAccount: '',
            name: '',
            price: 0,
        };

        const {
            register,
            handleSubmit: handleFormSubmit,
            resetField,
            setValue,
            formState: {errors},
        } = useForm<TTaskFields>({
            defaultValues: {
                bankAccount: defaultBankAccount,
                name: defaultName,
                price: Number(defaultPrice),
            },
            resolver: yupResolver(TASK_FIELDS_SCHEMA),
        });

        const [currentBankAccount, setCurrentBankAccount] = useState<string>('');

        const resetForms = () => {
            return isEdit ? setDefaultValues() : resetCreateForm();
        };

        const setDefaultValues = useCallback(() => {
            setValue('name', defaultName);
            setValue('price', Number(defaultPrice));
            setValue('bankAccount', defaultBankAccount);
            setCurrentBankAccount(defaultBankAccount);
        }, [defaultName, defaultPrice, defaultBankAccount, setValue]);
        const resetCreateForm = () => {
            resetField('name');
            resetField('price');
            resetField('bankAccount');
        };
        const handleClose = () => {
            onClose();
            resetForms();
        };
        const buttonText = isEdit ? 'Сохранить' : 'Добавить';
        const handleSubmit = ({name, price, bankAccount}: TTaskFields) => {
            onSubmit({
                bankAccount,
                name,
                price,
            });
        };

        const items = useMemo(() => {
            return accountsList.map((account) => {
                return {
                    label: <AccountsBadge $colorCode={account.colorCode as TAccountsColors} size="l" text={account.name} />,
                    value: account.id,
                };
            });
        }, [accountsList]);

        const handleChange = (value: string) => {
            setCurrentBankAccount(value);
            setValue('bankAccount', value);
        };

        useEffect(() => {
            setDefaultValues();
        }, [setDefaultValues]);

        return (
            <SheetModal isOpen={isOpen} title={title} handleClose={handleClose}>
                <TaskEditorForm onSubmit={handleFormSubmit(handleSubmit)}>
                    <div>
                        <TextField placeholder="Название задачи" size="l" label="Название задачи" {...register('name')} />
                        <ErrorField text={errors.name?.message} />
                    </div>
                    <div>
                        <TextField placeholder="Сумма" size="l" label="Сумма" {...register('price')} />
                        <ErrorField
                            text={
                                errors.price?.message?.includes('price must be a `number` type, but the final value was:')
                                    ? TASK_ERROR.SUM_NUMBER
                                    : errors.price?.message
                            }
                        />
                    </div>
                    <TaskEditorContent>
                        {Boolean(accountsList?.length) ? (
                            <Select
                                // @ts-ignore
                                items={items}
                                value={currentBankAccount}
                                placeholder="Выберите счет"
                                helperText="Счет"
                                onChange={(value) => handleChange(value)}
                            />
                        ) : (
                            <AccountsCard accountsList={accountsList} addAccount={addAccount} isFetching={isAccountsFetching} />
                        )}
                        <ErrorField text={errors.bankAccount?.message} />
                    </TaskEditorContent>
                    <TaskEditorFooter mt="10x">
                        <Button text="Отменить" size="s" view="secondary" onClick={handleClose} />
                        <Button isLoading={isFetching} text={buttonText} size="s" view="success" type="submit" />
                    </TaskEditorFooter>
                </TaskEditorForm>
            </SheetModal>
        );
    }
);
