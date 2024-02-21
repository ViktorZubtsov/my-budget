import * as yup from 'yup';

export const MAX_LENGTH = 60;
export const MIN_LENGTH = 3;

export const GOAL_FIELDS_SCHEMA = yup.object().shape({
    description: yup.string().max(MAX_LENGTH, `Поле должно содержать максимум ${MAX_LENGTH} символов`),
    name: yup
        .string()
        .required('Поле обязательно для заполнения')
        .min(MIN_LENGTH, `Поле должно содержать минимум ${MIN_LENGTH} символа`)
        .max(MAX_LENGTH, `Поле должно содержать максимум ${MAX_LENGTH} символов`),
});
