import {useState} from 'react';

export const useFetch = () => {
    const [isFetching, setIsFetching] = useState<boolean>(false);

    return {
        isFetching,
        setIsFetching,
    };
};

interface IUseTabs {
    defaultValue?: number;
}
export const useTabs = ({defaultValue = 0}: IUseTabs) => {
    const [currentTab, setCurrentTab] = useState<number>(defaultValue);

    return {
        currentTab,
        setCurrentTab,
    };
};
