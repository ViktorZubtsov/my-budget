import {memo} from 'react';

import {useFetch} from '@/hooks';
import {TTask} from '@/model';
import {useAccount} from '@/modules/Settings/hooks/useAccount';
import {TaskEditor, TTaskFields} from '@/modules/Task/components/TaskEditor';
import {useTask} from '@/modules/Task/hooks/useTask';

const TITLE = 'Изменить задачу';
interface IEditTask {
    isOpen: boolean;
    taskId: TTask['id'];
    onClose: () => void;
}
export const EditTask = memo(({onClose, isOpen, taskId}: IEditTask) => {
    const {accountsList} = useAccount();
    const {selectedTask} = useTask();
    const {isFetching, setIsFetching} = useFetch();

    const handleSaveTask = ({price, name, bankAccount}: TTaskFields) => {
        setIsFetching(true);
        // editTask(taskId, {
        //     bankAccount,
        //     name,
        //     price,
        // })
        //     .then(() => {
        //         mobileVibrate();
        //         onClose();
        //     })
        //     .finally(() => {
        //         setIsFetching(false);
        //     });
    };

    return (
        <TaskEditor
            accountsList={accountsList}
            isOpen={isOpen}
            onClose={onClose}
            title={TITLE}
            defaultValues={selectedTask(taskId)}
            isFetching={isFetching}
            isEdit
            onSubmit={handleSaveTask}
        />
    );
});
