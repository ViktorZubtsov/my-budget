import {memo} from 'react';

import {mobileVibrate} from '../../../../helpers';
import {useFetch} from '../../../../hooks';
import {IAccount, TTask} from '../../../../model';
import {TaskEditor, TTaskFields} from '../TaskEditor';
import {useTask} from '../../hooks';

const TITLE = 'Изменить задачу';
interface IEditTask {
    taskList: TTask[];
    accountsList: IAccount[];
    isOpen: boolean;
    selectedTask: {price: TTask['price']; bankAccount: TTask['bankAccount']; name: TTask['name']};
    taskId: TTask['id'];
    onClose: () => void;
}
export const EditTask = memo(({onClose, isOpen, taskId, selectedTask, accountsList, taskList}: IEditTask) => {
    const {editTask} = useTask({taskList});
    const {isFetching, setIsFetching} = useFetch();

    const handleSaveTask = ({price, name, bankAccount}: TTaskFields) => {
        setIsFetching(true);
        editTask(taskId, {
            bankAccount,
            name,
            price,
        })
            .then(() => {
                mobileVibrate();
                onClose();
            })
            .finally(() => {
                setIsFetching(false);
            });
    };

    return (
        <TaskEditor
            accountsList={accountsList}
            isOpen={isOpen}
            onClose={onClose}
            title={TITLE}
            defaultValues={selectedTask}
            isFetching={isFetching}
            isEdit
            onSubmit={handleSaveTask}
        />
    );
});
