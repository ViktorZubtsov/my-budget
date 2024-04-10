import {Session} from 'next-auth';

import {TEST_USER_ID} from '@/constant';
import {TUid} from '@/model';

export class User {
    session: Session | null;
    constructor(session: Session | null) {
        this.session = session;
    }
    getUid(): TUid {
        return TEST_USER_ID ?? this.session?.user.id;
    }
}
