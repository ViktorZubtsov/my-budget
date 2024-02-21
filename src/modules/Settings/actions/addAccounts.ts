import prismaClient from '../../../core/prisma';
import {IAccount, TUid} from '../../../model';

interface IAddAccountsProps {
    account: IAccount;
    uid: TUid;
}
export const addAccounts = async ({uid, account}: IAddAccountsProps) => {
    const {name, id, colorCode} = account;

    await prismaClient.$queryRaw<IAccount>`
        INSERT INTO BankAccounts (id, name, colorCode, updatedAt, userUid)
        values (${id}, ${name}, ${colorCode}, ${new Date()}, ${uid});`;
};
