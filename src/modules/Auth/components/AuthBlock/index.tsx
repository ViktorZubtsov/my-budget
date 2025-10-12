import {
    Button,
    Card,
    CardBody,
    CardContent,
    CarouselGridWrapper,
    CarouselItemVirtual,
    CarouselVirtual,
    H3,
    h4,
    Row,
    TextBox,
    TextField,
    textS,
} from '@salutejs/plasma-ui';
import {useVirtual} from '@salutejs/use-virtual';
import {useSearchParams} from 'next/navigation';
import {signIn} from 'next-auth/react';
import React, {useCallback, useRef, useState} from 'react';
import {toast} from 'react-toastify';

import {AuthBlockCard, AuthBlockStyled, FormContainer, ToggleButton} from './styled';

interface IFormData {
    email: string;
    name: string;
    password: string;
}

interface ICarouselItem {
    description: string;
    src: string;
    title: string;
}

const CarouselSection = () => {
    const parentRef = useRef(null);
    const axis = 'x';
    const width = 300;
    const gap = 10;

    const {visibleItems, totalSize, currentIndex} = useVirtual({
        axis,
        estimateSize: useCallback(() => width + gap, [width, gap]),
        itemCount: 100,
        overscan: 10,
        parentRef,
    });

    const carouselContent: ICarouselItem[] = [
        {
            description: 'Это приложение для учета и анализа ваших финансов.',
            src: '/images/welcome-1.svg',
            title: 'Мой Бюджет!',
        },
        {
            description: 'Создайте свои финансовые цели и контролируйте свой бюджет с легкостью.',
            src: '/images/welcome-2.svg',
            title: 'Цели',
        },
        {
            description: 'Планируйте свои расходы, создавая задачи.',
            src: '/images/welcome-3.svg',
            title: 'Задачи',
        },
        {
            description: 'Следите за каждым шагом на пути к достижению ваших целей, отмечая выполненные задачи.',
            src: '/images/welcome-4.svg',
            title: 'График',
        },
        {
            description: 'Анализируя свой прогресс',
            src: '/images/welcome-5.svg',
            title: 'Прогресс',
        },
    ];

    return (
        <div>
            <CarouselGridWrapper>
                <CarouselVirtual
                    ref={parentRef}
                    as={Row}
                    axis={axis}
                    style={{
                        height: '350px',
                        paddingBottom: '1.25rem',
                        paddingTop: '1.25rem',
                        width: '100vw',
                    }}
                    virtualSize={totalSize}
                >
                    {visibleItems.slice(0, carouselContent.length).map(({index: i, start}) => {
                        return (
                            <CarouselItemVirtual key={i} left={start} style={{width: `${width}px`}} aria-label={`${i + 1} из 100`}>
                                <Card style={{height: `${width}px`, margin: `${gap}px`, width: `${width}px`}} focused={i === currentIndex}>
                                    <CardBody>
                                        <CardContent>
                                            <TextBox>
                                                <div>
                                                    <h2 style={{...h4, fontWeight: 600}}>{carouselContent[i]?.title}</h2>
                                                    <span style={{...textS, color: 'rgba(255,255,255,0.56)'}}>{carouselContent[i]?.description}</span>
                                                    <img src={carouselContent[i]?.src} alt={`${i}`} />
                                                </div>
                                            </TextBox>
                                        </CardContent>
                                    </CardBody>
                                </Card>
                            </CarouselItemVirtual>
                        );
                    })}
                </CarouselVirtual>
            </CarouselGridWrapper>
        </div>
    );
};

export const AuthBlock = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams?.get('callbackUrl') || '/';
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<IFormData>({
        email: '',
        name: '',
        password: '',
    });

    const handleInputChange = (field: keyof IFormData, value: string) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleLogin = async () => {
        const result = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });

        if (result?.error) {
            toast.error('Неверный email или пароль');
        } else {
            toast.success('Успешный вход!');
            window.location.href = callbackUrl;
        }
    };

    const handleRegister = async () => {
        try {
            const response = await fetch('/api/auth/register', {
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Регистрация успешна! Теперь войдите в систему.');
                setIsLogin(true);
                setFormData({email: '', name: '', password: ''});
            } else {
                // Обработка ошибок валидации
                if (data.details && Array.isArray(data.details)) {
                    const errorMessages = data.details.map((detail: any) => detail.message).join(', ');
                    toast.error(errorMessages);
                } else {
                    toast.error(data.error || 'Ошибка регистрации');
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Произошла ошибка при регистрации');
        }
    };

    const getButtonText = () => {
        if (isLoading) return 'Загрузка...';
        return isLogin ? 'Войти' : 'Зарегистрироваться';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isLogin) {
                await handleLogin();
            } else {
                await handleRegister();
            }
        } catch (error) {
            toast.error('Произошла ошибка');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthBlockStyled pb="16x" pt="16x" pl="5x">
            <CarouselSection />

            <AuthBlockCard mt="12x" p="10x">
                <H3>{isLogin ? 'Вход в Мой Бюджет' : 'Регистрация в Мой Бюджет'}</H3>

                <FormContainer onSubmit={handleSubmit}>
                    {!isLogin && (
                        <TextField
                            label="Имя"
                            placeholder="Введите ваше имя"
                            value={formData.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
                            required
                        />
                    )}

                    <TextField
                        label="Email"
                        type="email"
                        placeholder="Введите ваш email"
                        value={formData.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
                        required
                    />

                    <TextField
                        label="Пароль"
                        type="password"
                        placeholder="Введите пароль"
                        value={formData.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('password', e.target.value)}
                        required
                    />

                    <Button type="submit" disabled={isLoading} size="m" view="primary">
                        {getButtonText()}
                    </Button>
                </FormContainer>

                <ToggleButton
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setFormData({email: '', name: '', password: ''});
                    }}
                >
                    {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
                </ToggleButton>
            </AuthBlockCard>
        </AuthBlockStyled>
    );
};
