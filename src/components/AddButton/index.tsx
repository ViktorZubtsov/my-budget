import {IconPlus} from '@salutejs/plasma-icons';
import {Button} from '@salutejs/plasma-ui';

import {AddButtonStyled} from './styled';
import {DATA_TEST} from '../../constant/dataTest';

interface IAddButtonProps {
    isFixed?: boolean;
    onClick: () => void;
}

export const AddButton = ({onClick, isFixed}: IAddButtonProps) => (
    <AddButtonStyled $isFixed={Boolean(isFixed)}>
        <Button id={DATA_TEST.ADD_GOAL} contentLeft={<IconPlus />} pin="circle-circle" onClick={onClick} />
    </AddButtonStyled>
);