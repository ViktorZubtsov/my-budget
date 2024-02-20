export const fetcher = (resource: RequestInfo | URL, init: RequestInit | undefined) => fetch(resource, init).then((res) => res.json());
