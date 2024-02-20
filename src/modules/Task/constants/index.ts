import * as yup from 'yup';

export const MAX_LENGTH = 60;
export const MIN_LENGTH = 3;
export const MAX_PRICE = 1000000000;

export const TASK_FIELDS_SCHEMA = yup.object().shape({
    bankAccount: yup.string().required('Поле обязательно для заполнения'),
    name: yup
        .string()
        .required('Поле обязательно для заполнения')
        .min(MIN_LENGTH, `Поле должно содержать минимум ${MIN_LENGTH} символа`)
        .max(MAX_LENGTH, `Поле должно содержать максимум ${MAX_LENGTH} символов`),
    price: yup
        .number()
        .positive('Поле должно быть положительным числом')
        .required('Поле обязательно для заполнения')
        .max(MAX_PRICE, 'Поле должно быть максимум 10 миллиардов'),
});
