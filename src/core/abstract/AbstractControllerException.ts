export abstract class AbstractControllerException<T extends Record<string, any> = Record<string, any>> extends Error {
    public abstract makeNextControllerObject(): T;

    public static isIt(error: any) {
        if (error instanceof AbstractControllerException) {
            throw error;
        }
    }
}
