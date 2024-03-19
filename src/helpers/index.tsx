import {toast} from 'react-toastify';

import errorHandler from '@/core/exceptions/ErrorHandler';
import {IAccount, TAccountsColors} from '@/model';

import {LOCAL_STORAGE_KEYS} from '../constant';
import Provider from '../core/provider';

export function getRandomColors(count: number) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const color = `rgba(${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, 0.2)`;
        colors.push(color);
    }
    return colors;
}

export function getRandomValue(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const VIBRATE_TIME = 200;
export function mobileVibrate() {
    if (!Object.keys(localStorage).includes(LOCAL_STORAGE_KEYS.VIBRATION)) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.VIBRATION, String('true'));
    }
    if ('true' === localStorage.getItem(LOCAL_STORAGE_KEYS.VIBRATION)) {
        return window.navigator.vibrate(VIBRATE_TIME);
    }
    return null;
}

export const decorators = [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story: any) => (
        <Provider>
            <Story />
        </Provider>
    ),
];
export class ResizeObserver {
    observe() {
        // do nothing
    }
    unobserve() {
        // do nothing
    }
    disconnect() {
        // do nothing
    }
}

export const onError = (err: any) => {
    toast.error('Что-то пошло не так', {theme: 'dark'});
    errorHandler(err);
};

export function generateWord(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function generateAccount(length: number): IAccount[] {
    let result: IAccount[] = [];

    for (let i = 0; i < length; i++) {
        result.push({
            colorCode: 'critical',
            id: generateWord(5),
            name: generateWord(10),
        });
    }
    return result;
}
