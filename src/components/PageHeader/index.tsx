import {H2} from '@salutejs/plasma-ui';
import {memo} from 'react';

import {TEST_PAGE_HEADER} from '@/constant/dataTest';

import {PageHeaderIcon, PageHeaderStyled} from './styled';

interface IPageHeaderProps {
    title: string;
    onClick: () => void;
}

export const PageHeader = memo<IPageHeaderProps>(({onClick, title}) => {
    return (
        <PageHeaderStyled>
            <div data-testid={TEST_PAGE_HEADER.GO_TO} onClick={onClick}>
                <PageHeaderIcon />
            </div>
            <div>
                <H2>{title}</H2>
            </div>
        </PageHeaderStyled>
    );
});
