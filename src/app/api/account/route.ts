import {NextRequest, NextResponse} from 'next/server';

import {IAccount} from '@/model';
import {addAccounts} from '@/modules/Settings/actions/addAccounts';
import {getAccountsList} from '@/modules/Settings/actions/getAccountsList';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const uid = searchParams.get('uid') as string;

    const data = await getAccountsList({uid});

    return NextResponse.json({data});
}

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const account = (await request.json()) as IAccount;
    const uid = searchParams.get('uid') as string;

    try {
        const data = await addAccounts({
            account,
            uid,
        });

        return NextResponse.json({data});
    } catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}
