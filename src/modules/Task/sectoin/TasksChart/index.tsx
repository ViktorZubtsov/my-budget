import {H5, Price, TextM} from '@salutejs/plasma-ui';
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import {useMemo} from 'react';
import {Pie} from 'react-chartjs-2';

import {EmptyList} from '../../../../components/EmptyList';
import {getRandomColors} from '../../../../helpers';
import {TTask} from '../../../../model';

import styles from './styles.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

export const TasksChart = ({taskList}: {taskList: TTask[]}) => {
    const pieData = useMemo(() => {
        return {
            datasets: [
                {
                    backgroundColor: getRandomColors(taskList.length),
                    borderColor: getRandomColors(taskList.length * 2),
                    borderWidth: 1,
                    data: taskList.map(({price}) => price),
                },
            ],
            labels: taskList.map(({name}) => name),
        };
    }, [taskList]);

    const budgetSum = useMemo<{remainder: number; spent: number}>(() => {
        return {
            remainder: taskList.reduce((previousValue, currentValue) => {
                return !currentValue.done ? Number(previousValue) + Number(currentValue.price) : Number(previousValue);
            }, 0),
            spent: taskList.reduce((previousValue, currentValue) => {
                return currentValue.done ? Number(previousValue) + Number(currentValue.price) : Number(previousValue);
            }, 0),
        };
    }, [taskList]);

    return (
        <div>
            {!Boolean(taskList.length) && <EmptyList text="Список задач пуст" />}
            {Boolean(taskList.length) && (
                <>
                    <div>
                        <div className={styles.SumWrap}>
                            <H5>Потраченно:</H5>
                            <Price currency="rub" stroke={false} minimumFractionDigits={2}>
                                {budgetSum.spent}
                            </Price>
                        </div>
                        <div className={styles.SumWrap}>
                            <H5>Осталось:</H5>
                            <Price currency="rub" stroke={false} minimumFractionDigits={2}>
                                {budgetSum.remainder}
                            </Price>
                        </div>
                    </div>
                    <div style={{margin: '0 auto', maxWidth: '500px', width: '100%'}}>
                        <Pie
                            data={pieData}
                            options={{
                                plugins: {
                                    legend: {
                                        align: 'start',
                                        labels: {
                                            color: '#fff',
                                            textAlign: 'right',
                                        },
                                        textDirection: 'left',
                                    },
                                },
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
};
