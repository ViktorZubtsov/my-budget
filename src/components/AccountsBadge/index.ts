import {Badge, textS} from '@salutejs/plasma-ui';
import {BadgeProps} from '@salutejs/plasma-ui/components/Badge/Badge';
import styled from 'styled-components';

import {ACCOUNTS_COLORS} from '../../constant';
import {TAccountsColors} from '../../model';

interface IAccountsBadgeProps extends BadgeProps {
    $colorCode: TAccountsColors;
}

export const AccountsBadge = styled(Badge)<IAccountsBadgeProps>`
    background: ${(props) => ACCOUNTS_COLORS[props.$colorCode]};
    ${textS}
`;
