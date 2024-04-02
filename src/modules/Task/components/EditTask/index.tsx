import {memo} from 'react';

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
    const {selectedTask, editTask, isUpdateLoader} = useTask();
    const {accountsList, addAccount, isMutating} = useAccount();

    const handleSaveTask = ({price, name, bankAccount}: TTaskFields) => {
        return editTask({
            task: {
                bankAccount,
                name,
                price,
            },
            taskId,
        }).then(onClose);
    };

    return (
        <TaskEditor
            accountsList={accountsList}
            isOpen={isOpen}
            onClose={onClose}
            isAccountsFetching={isMutating}
            title={TITLE}
            addAccount={addAccount}
            defaultValues={selectedTask(taskId)}
            isFetching={isUpdateLoader}
            isEdit
            onSubmit={handleSaveTask}
        />
    );
});
