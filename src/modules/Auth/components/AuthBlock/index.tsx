import {
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
    textS,
} from '@salutejs/plasma-ui';
import {useVirtual} from '@salutejs/use-virtual';
import {useSearchParams} from 'next/navigation';
import {signIn} from 'next-auth/react';
import React, {useCallback, useRef} from 'react';
import GoogleButton from 'react-google-button';
import ym from 'react-yandex-metrika';

import {AuthBlockCard, AuthBlockStyled} from './styled';

export const AuthBlock = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams?.get('callbackUrl') || '/';
    const parentRef = useRef(null);
    const axis = 'x';
    const width = 300;
    const gap = 10;

    const {visibleItems, totalSize, currentIndex} = useVirtual({
        axis,
        estimateSize: useCallback(() => width + gap, [width, gap]),
        itemCount: 100,
        // estimateSize должен возвращать значение в px
        overscan: 10,
        parentRef,
    });

    const onClick = () => {
        if ('production' === process.env.NODE_ENV) {
            ym('reachGoal');
        }
        return signIn('google', {callbackUrl});
    };
    const content = [
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
        <AuthBlockStyled pb="16x" pt="16x" pl="5x">
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
                        {visibleItems.slice(0, content.length).map(({index: i, start}) => {
                            return (
                                <CarouselItemVirtual key={i} left={start} style={{width: `${width}px`}} aria-label={`${i + 1} из 100`}>
                                    <Card style={{height: `${width}px`, margin: `${gap}px`, width: `${width}px`}} focused={i === currentIndex}>
                                        <CardBody>
                                            <CardContent>
                                                <TextBox>
                                                    <div>
                                                        <h2 style={{...h4, fontWeight: 600}}>{content[i]?.title}</h2>
                                                        <span style={{...textS, color: 'rgba(255,255,255,0.56)'}}>{content[i]?.description}</span>
                                                        <img src={content[i]?.src} alt={`${i}`} />
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

            <AuthBlockCard mt="12x" p="10x">
                <H3>Вход в Мой Бюджет</H3>
                <GoogleButton label="Войти с Google" type="light" onClick={onClick} />
            </AuthBlockCard>
        </AuthBlockStyled>
    );
};
