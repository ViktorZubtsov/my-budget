import {IconPlus} from '@salutejs/plasma-icons';
import {Button} from '@salutejs/plasma-ui';

import {TEST_ID_GOAL} from '@/constant/dataTest';

import {AddButtonStyled} from './styled';

interface IAddButtonProps {
    isFixed?: boolean;
    onClick: () => void;
}

export const AddButton = ({onClick, isFixed}: IAddButtonProps) => (
    <AddButtonStyled $isFixed={Boolean(isFixed)}>
        <Button data-testid={TEST_ID_GOAL.ADD_GOAL} contentLeft={<IconPlus />} pin="circle-circle" onClick={onClick} />
    </AddButtonStyled>
);
