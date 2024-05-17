// @ts-ignore
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import {useMemo} from 'react';
import {Pie} from 'react-chartjs-2';

import {EmptyList} from '@/components/EmptyList';
import {getRandomColors} from '@/helpers';
import {TaskSum} from '@/modules/Task/components/TaskSum';
import {useTask} from '@/modules/Task/hooks/useTask';
import {TasksChartContent} from '@/modules/Task/sectoin/TasksChart/styled';

ChartJS.register(ArcElement, Tooltip, Legend);

export const TasksChart = () => {
    const {taskList} = useTask();

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
                        <TaskSum title="Потраченно" sum={budgetSum.spent} />
                        <TaskSum title="Осталось" sum={budgetSum.remainder} />
                    </div>
                    <TasksChartContent>
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
                    </TasksChartContent>
                </>
            )}
        </div>
    );
};
