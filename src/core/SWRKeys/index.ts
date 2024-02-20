import {TUid} from '../../model';

export const KEY_ACCOUNT = '/api/account';
export const KEY_GOAL_LIST = '/api/goal-list';
export const getAccountKey = (uid: TUid) => (uid ? KEY_ACCOUNT + `?uid=${uid}` : null);
export const getGoalListKey = (uid: TUid) => (uid ? KEY_GOAL_LIST + `?uid=${uid}` : null);
