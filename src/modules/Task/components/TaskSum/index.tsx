import {H5, Price} from '@salutejs/plasma-ui';
import {memo} from 'react';

import {TEST_ID_TASK} from '@/constant/dataTest';
import {TaskSumStyled} from '@/modules/Task/components/TaskSum/styled';

interface ITaskSumParams {
    digits?: number;
    title?: string;
    sum: number | undefined;
}

export const TaskSum = memo<ITaskSumParams>(function TaskSum({sum, title, digits = 2}) {
    return (
        <TaskSumStyled>
            <H5>{title ? title : 'Сумма'}</H5>
            <Price currency="rub" data-testid={TEST_ID_TASK.TASK_SUM} stroke={false} minimumFractionDigits={digits}>
                {sum ?? 0}
            </Price>
        </TaskSumStyled>
    );
});
