import {H5, Price, PriceProps} from '@salutejs/plasma-ui';
import {withSkeleton, WithSkeletonProps} from '@salutejs/plasma-web';
import {memo} from 'react';

import {TEST_ID_TASK} from '@/constant/dataTest';
import {TaskSumStyled} from '@/modules/Task/components/TaskSum/styled';

interface ITaskSumParams {
    digits?: number;
    title?: string;
    skeleton?: boolean;
    sum: number | undefined;
}

export const TaskSum = memo<ITaskSumParams>(function TaskSum({sum, title, skeleton, digits = 2}) {
    const PriceSkeleton = withSkeleton<PriceProps & WithSkeletonProps>(Price);

    return (
        <TaskSumStyled>
            <H5>{title ? title : 'Сумма'}</H5>
            <PriceSkeleton
                style={{color: skeleton ? 'transparent' : ''}}
                skeleton={skeleton}
                currency="rub"
                data-testid={TEST_ID_TASK.TASK_SUM}
                stroke={false}
                minimumFractionDigits={digits}
            >
                {sum ?? 0}
            </PriceSkeleton>
        </TaskSumStyled>
    );
});
