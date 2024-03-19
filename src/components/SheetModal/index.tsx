import {H3, Sheet} from '@salutejs/plasma-ui';
import {ReactNode} from 'react';

import {SheetModalContent} from './styled';

interface ISheetModal {
    isOpen: boolean;
    title: string;
    handleClose: () => void;
    children: ReactNode;
}

export const SheetModal = ({isOpen, title, children, handleClose}: ISheetModal) => {
    return (
        <Sheet isOpen={isOpen} onClose={handleClose}>
            <SheetModalContent pt="10x" pb="10x">
                <H3 style={{textAlign: 'center'}}>{title}</H3>
                <div>{children}</div>
            </SheetModalContent>
        </Sheet>
    );
};
