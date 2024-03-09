import {useSession} from 'next-auth/react';
import {memo, useState} from 'react';

import {AddButton} from '../../../../components/AddButton';
import {mobileVibrate} from '../../../../helpers';
import {useGoal} from '../../hooks/useGoal';
import {GoalEditor, TGoalFields} from '../GoalEditor';

export const AddGoal = memo(() => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [isFetch, setIsFetch] = useState<boolean>(false);
    const {data} = useSession();
    const {addGoal} = useGoal();

    const handeClose = () => {
        setIsOpen(false);
    };
    const handeAddGoal = ({name, description}: TGoalFields) => {
        setIsFetch(true);
        // @ts-ignore
        addGoal(data?.user.id, {description: description ?? '', name})
            .then(() => {
                mobileVibrate();
                handeClose();
            })
            .finally(() => {
                setIsFetch(false);
            });
    };

    return (
        <>
            <AddButton isFixed onClick={() => setIsOpen(!isOpen)} />
            <GoalEditor submitText="Создать" title="Создать цель" isOpen={isOpen} isFetch={isFetch} onSubmit={handeAddGoal} handeClose={handeClose} />
        </>
    );
});
