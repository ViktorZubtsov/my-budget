import {captureException} from '@sentry/browser';

const errorHandler = (error: any) => {
    captureException(error);
    return new Error(error);
};
export default errorHandler;
