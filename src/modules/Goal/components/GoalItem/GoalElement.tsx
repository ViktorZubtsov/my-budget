import {CellDisclosure, h5, TextBox, TextBoxSubTitle, TextBoxTitle} from '@salutejs/plasma-ui';

import {TEST_ID_GOAL_ITEM} from '@/constant/dataTest';
import {IGoal} from '@/model';
import {GoalItemStyled} from '@/modules/Goal/components/GoalItem/styled';

export const GoalElement = ({name, description}: {name: IGoal['name']; description: IGoal['description']}) => {
    return (
        <GoalItemStyled data-testid={TEST_ID_GOAL_ITEM.GOAL_ITEM} pt="1x" pb="1x" pl="5x" pr="5x">
            <TextBox>
                <TextBoxTitle style={h5}>{name}</TextBoxTitle>
                <TextBoxSubTitle>{description}</TextBoxSubTitle>
            </TextBox>
            <CellDisclosure size="s" tabIndex={-1} />
        </GoalItemStyled>
    );
};
