import {IGoal, TUid} from '@/model';

export const KEY_ACCOUNT = '/api/account';
export const KEY_GOAL_LIST = '/api/goal/list';
export const KEY_GOAL_X = '/api/goal';
export const KEY_GOAL_ARCHIVE_X = '/api/goal/archive';
export const KEY_ARCHIVE_GOAL_LIST = '/api/goal/archive-list';
export const getAccountKey = (uid: TUid) => (uid ? KEY_ACCOUNT + `?uid=${uid}` : null);
export const getGoalListKey = (uid: TUid) => (uid ? KEY_GOAL_LIST + `?uid=${uid}` : null);
export const getArchiveGoalListKey = (uid: TUid) => (uid ? KEY_ARCHIVE_GOAL_LIST + `?uid=${uid}` : null);
export const getGoalXKey = (uid: TUid, goalId: IGoal['id']) => (uid ? KEY_GOAL_X + `?uid=${uid}&goalId=${goalId}` : null);
export const getGoalArchiveXKey = (uid: TUid, goalId: IGoal['id']) => (uid ? KEY_GOAL_ARCHIVE_X + `?uid=${uid}&goalId=${goalId}` : null);
