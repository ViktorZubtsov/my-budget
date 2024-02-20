import {TextM} from '@salutejs/plasma-ui';

interface IErrorFieldProps {
    text?: string;
}
export const ErrorField = ({text}: IErrorFieldProps) => {
    return <TextM style={{color: '#f04f4f', marginTop: '10px'}}>{text}</TextM>;
};
