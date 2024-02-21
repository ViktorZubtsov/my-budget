import {NextResponse} from 'next/server';

import prismaClient from '../../../core/prisma';

export async function POST(request: Request) {
    const {bankAccount, price, name, taskId} = await request.json();

    const data = await prismaClient.$queryRaw`
                update   Task
                set   
                bankAccount =  ${bankAccount},
                price =  ${price},
                name =  ${name}
                where id = ${taskId}
    `;
    return NextResponse.json({data});
}
