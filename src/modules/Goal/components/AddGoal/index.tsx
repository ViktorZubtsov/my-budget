import {memo, useState} from 'react';

import {AddButton} from '@/components/AddButton';
import {mobileVibrate} from '@/helpers';
import {GoalEditor, TGoalFields} from '@/modules/Goal/components/GoalEditor';
import {useGoal} from '@/modules/Goal/hooks/useGoal';

export const AddGoal = memo(() => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {addGoal, isGoalLoader} = useGoal();

    const handeClose = () => {
        setIsOpen(false);
    };

    const handeAddGoal = ({name, description}: TGoalFields) => {
        addGoal({description: description ?? '', name}).then(() => {
            mobileVibrate();
            handeClose();
        });
    };

    return (
        <>
            <AddButton isFixed onClick={() => setIsOpen(!isOpen)} />
            <GoalEditor
                submitText="Создать"
                title="Создать цель"
                isOpen={isOpen}
                isFetch={isGoalLoader}
                onSubmit={handeAddGoal}
                handeClose={handeClose}
            />
        </>
    );
});
