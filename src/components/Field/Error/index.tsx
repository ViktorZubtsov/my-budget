import {TextError} from '@/components/Field/Error/styled';

interface IErrorFieldProps {
    text?: string;
}
export const ErrorField = ({text}: IErrorFieldProps) => {
    return <TextError>{text}</TextError>;
};
