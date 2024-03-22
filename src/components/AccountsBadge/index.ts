import {Badge, textS} from '@salutejs/plasma-ui';
import {BadgeProps} from '@salutejs/plasma-ui/components/Badge/Badge';
import styled from 'styled-components';

import {ACCOUNTS_COLORS} from '@/constant';
import {TAccountsColors} from '@/model';

interface IAccountsBadgeProps extends BadgeProps {
    $colorCode: TAccountsColors;
    $isDone?: boolean;
}

export const AccountsBadge = styled(Badge)<IAccountsBadgeProps>`
    // @ts-ignore
    background: ${({$colorCode}) => ACCOUNTS_COLORS[$colorCode as keyof typeof ACCOUNTS_COLORS] ?? ACCOUNTS_COLORS.critical};
    text-decoration: ${({$isDone}) => ($isDone ? 'line-through' : 'none')};
    ${textS}
`;
