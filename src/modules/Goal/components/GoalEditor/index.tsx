import {yupResolver} from '@hookform/resolvers/yup';
import {Button, TextField} from '@salutejs/plasma-ui';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

import {ErrorField} from '../../../../components/Field/Error';
import {SheetModal} from '../../../../components/SheetModal';
import {GOAL_FIELDS_SCHEMA} from '../../constants';

import style from './styles.module.scss';

interface IGoalFieldsProps {
    handeClose: () => void;
    isFetch: boolean;
    isOpen: boolean;
    title: string;
    onSubmit: (data: TGoalFields) => void;
    submitText: string;
}

export type TGoalFields = yup.InferType<typeof GOAL_FIELDS_SCHEMA>;

export const GoalEditor = ({isFetch, onSubmit, isOpen, title, handeClose, submitText}: IGoalFieldsProps) => {
    const {
        register,
        handleSubmit: handleFormSubmit,
        resetField,

        formState: {errors},
    } = useForm({
        defaultValues: {
            description: '',
            name: '',
        },
        resolver: yupResolver(GOAL_FIELDS_SCHEMA),
    });
    const resetForms = () => {
        resetField('name');
        resetField('description');
    };
    const onClose = () => {
        resetForms();
        return handeClose();
    };
    const handleSubmit = ({name, description}: TGoalFields) => {
        resetForms();
        return onSubmit({
            description,
            name,
        });
    };

    return (
        <SheetModal title={title} isOpen={isOpen} handleClose={onClose}>
            <form onSubmit={handleFormSubmit(handleSubmit)}>
                <h1>Test</h1>
                <div className={style.Content}>
                    <div>
                        <TextField placeholder="Название цели" size="l" label="Название цели" {...register('name')} />
                        <ErrorField text={errors.name?.message} />
                    </div>
                    <div>
                        <TextField
                            placeholder="Описание цели (Не обязательно)"
                            size="l"
                            label="Описание цели (Не обязательно)"
                            {...register('description')}
                        />
                        <ErrorField text={errors.description?.message} />
                    </div>
                </div>
                <div className={style.Footer}>
                    <Button text="Отменить" size="s" view="secondary" onClick={onClose} />
                    <Button text={submitText} size="s" view="success" isLoading={isFetch} type="submit" />
                </div>
            </form>
        </SheetModal>
    );
};
