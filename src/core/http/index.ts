import {toast} from 'react-toastify';
export const fetcher = (resource: RequestInfo | URL, init: RequestInit | undefined) =>
    fetch(resource, init).then(async (res) => {
        try {
            const {data} = await res.json();

            return data;
        } catch (e) {
            if (404 === res.status) toast.error('Ошибка, страница не сществует', {theme: 'dark'});
            if (500 === res.status) toast.error('Ошибка, попробуйте позже', {theme: 'dark'});
            return {e, res};
        }
    });
