import * as yup from 'yup';

import {ERROR_TEXT} from '@/constant';

export const TASK_MAX_LENGTH = 60;
export const TASK_MIN_LENGTH = 3;
export const TASK_MAX_PRICE = 1000000000;

export const TASK_ERROR = {
    BANK_ACCOUNT: ERROR_TEXT.REQUIRED,
    NAME_MAX_LENGTH: ERROR_TEXT.MIN_LENGTH(TASK_MAX_LENGTH),
    NAME_MIN_LENGTH: ERROR_TEXT.MIN_LENGTH(TASK_MIN_LENGTH),
    NAME_REQUIRED: ERROR_TEXT.REQUIRED,
    PRICE_LIMIT: 'Поле должно быть максимум 10 миллиардов',
    PRICE_NATURAL: ERROR_TEXT.NATURAL_NUMBER,
    PRICE_REQUIRED: ERROR_TEXT.REQUIRED,
    SUM_NUMBER: 'Сумма должна быть числом',
};

export const TASK_FIELDS_SCHEMA = yup.object().shape({
    bankAccount: yup.string().required(TASK_ERROR.BANK_ACCOUNT),
    name: yup
        .string()
        .required(TASK_ERROR.NAME_REQUIRED)
        .min(TASK_MIN_LENGTH, TASK_ERROR.NAME_MIN_LENGTH)
        .max(TASK_MAX_LENGTH, TASK_ERROR.NAME_MAX_LENGTH),
    price: yup.number().positive(TASK_ERROR.PRICE_NATURAL).required(TASK_ERROR.PRICE_REQUIRED).max(TASK_MAX_PRICE, TASK_ERROR.PRICE_LIMIT),
});
