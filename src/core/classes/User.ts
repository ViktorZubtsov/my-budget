import {Session} from 'next-auth';

import {TUid} from '../../model';

export class User {
    session: Session | null;
    constructor(session: Session | null) {
        this.session = session;
    }
    getUid(): TUid {
        // TODO: для Демо
        return 'clpdnwkhm0000dgnrlljhvj2e';
    }
}
