'use client';
import {IconChevronLeft} from '@salutejs/plasma-icons';
import {Container, TextM} from '@salutejs/plasma-ui';
import {H4} from '@salutejs/plasma-web';
import {useRouter} from 'next/navigation';

import {IGoal} from '../../../../model';

import styles from './styles.module.scss';

export const GoalXHeader = ({goal}: {goal?: IGoal}) => {
    const {back} = useRouter();
    const {name, description} = goal ?? {
        description: '',
        name: '',
    };

    return (
        <Container>
            <div className={styles.GoalXHeader}>
                <div onClick={back}>
                    <IconChevronLeft className={styles.Icon} size="s" color="inherit" />
                </div>
                <div className={styles.GoalXHeaderContent}>
                    <H4>{name}</H4>
                    <TextM className={styles.Subtitle}>{description}</TextM>
                </div>
            </div>
        </Container>
    );
};
