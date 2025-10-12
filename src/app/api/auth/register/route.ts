import bcrypt from 'bcryptjs';
import {NextRequest, NextResponse} from 'next/server';
import {z} from 'zod';

import prismaClient from '@/core/prisma';

const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGTH = 2;
const BCRYPT_ROUNDS = 12;

const registerSchema = z.object({
    email: z.string().email('Некорректный email'),
    name: z.string().min(MIN_NAME_LENGTH, 'Имя должно содержать минимум 2 символа'),
    password: z.string().min(MIN_PASSWORD_LENGTH, 'Пароль должен содержать минимум 6 символов'),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {email, name, password} = registerSchema.parse(body);

        // Проверяем, существует ли пользователь с таким email
        const existingUser = await prismaClient.user.findUnique({
            where: {email},
        });

        if (existingUser) {
            return NextResponse.json({error: 'Пользователь с таким email уже существует'}, {status: 400});
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

        // Создаем пользователя
        const user = await prismaClient.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });

        // Возвращаем пользователя без пароля
        const {password: passwordField, ...userWithoutPassword} = user;

        return NextResponse.json(
            {
                message: 'Пользователь успешно зарегистрирован',
                user: userWithoutPassword,
            },
            {status: 201}
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({details: error.issues, error: 'Некорректные данные'}, {status: 400});
        }

        console.error('Registration error:', error);
        return NextResponse.json({error: 'Внутренняя ошибка сервера'}, {status: 500});
    }
}
