import {Card, MarkedItem, Price} from '@salutejs/plasma-ui';
import {MarkedItemProps} from '@salutejs/plasma-ui/components/MarkedList/MarkedList';
import {PriceProps} from '@salutejs/plasma-ui/components/Price/Price';
import styled from 'styled-components';

export const TaskElementStyled = styled(Card)`
    width: 100%;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
`;

export const PricesWrap = styled.div`
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const BadgeWrap = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    width: 100%;
`;
interface ITaskElementPriceProps extends PriceProps {
    $isDone: boolean;
}

export const TaskElementPrice = styled(Price)<ITaskElementPriceProps>`
    text-decoration: ${({$isDone}) => ($isDone ? 'line-through' : 'none')};
`;

interface ITaskElementMarkedItemProps extends MarkedItemProps {
    $isDone: boolean;
}

export const TaskElementMarkedItem = styled(MarkedItem)<ITaskElementMarkedItemProps>`
    text-decoration: ${({$isDone}) => ($isDone ? 'line-through' : 'none')};
`;
