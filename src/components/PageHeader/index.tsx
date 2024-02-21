import {H2} from '@salutejs/plasma-ui';
import {memo} from 'react';

import {PageHeaderIcon, PageHeaderStyled} from './styled';

interface IPageHeaderProps {
    title: string;
    onClick: () => void;
}

export const PageHeader = memo<IPageHeaderProps>(({onClick, title}) => {
    return (
        <PageHeaderStyled>
            <div onClick={onClick}>
                <PageHeaderIcon />
            </div>
            <div>
                <H2>{title}</H2>
            </div>
        </PageHeaderStyled>
    );
});
