import {IconFeedback} from '@salutejs/plasma-icons';
import {H3} from '@salutejs/plasma-ui';

import {EmptyListStyled} from './styled';

interface IEmptyListProps {
    text: string;
}
export const EmptyList = ({text}: IEmptyListProps) => {
    return (
        <EmptyListStyled>
            <IconFeedback size="s" />
            <H3>{text}</H3>
        </EmptyListStyled>
    );
};
