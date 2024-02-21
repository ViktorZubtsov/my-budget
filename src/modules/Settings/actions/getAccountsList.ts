import prismaClient from '../../../core/prisma';
import {IAccount, TUid} from '../../../model';

export const getAccountsList = async ({uid}: {uid: TUid}) => {
    return prismaClient.$queryRaw<IAccount[]>`select name, colorCode, id  from BankAccounts where userUid  = ${uid} ORDER BY updatedAt ASC`;
};
