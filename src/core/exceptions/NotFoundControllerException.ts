import {AbstractControllerException} from '../abstract/AbstractControllerException';

type TNextNotFoundObject = {
    notFound: boolean;
};

export class NotFoundControllerException extends AbstractControllerException<TNextNotFoundObject> {
    public makeNextControllerObject(): TNextNotFoundObject {
        return {
            notFound: true,
        };
    }
}
