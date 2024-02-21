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
