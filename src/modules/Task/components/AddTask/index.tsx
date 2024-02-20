const TITLE = 'Создать задачу';

import {mobileVibrate} from '../../../../helpers';
import {useFetch} from '../../../../hooks';
import {IAccount, TTask} from '../../../../model';
import {TaskEditor, TTaskFields} from '../TaskEditor';
import {useTask} from '../../hooks';

interface IAddTask {
    taskList: TTask[];
    accountsList: IAccount[];
    isOpen: boolean;
    onClose: () => void;
}
export const AddTask = ({onClose, isOpen, accountsList, taskList}: IAddTask) => {
    const {createTask} = useTask({taskList});
    const {isFetching, setIsFetching} = useFetch();
    const slug = '';

    const handleAddTask = ({price, name, bankAccount}: TTaskFields) => {
        setIsFetching(true);
        createTask(String(slug), {
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
            isFetching={isFetching}
            isEdit
            onSubmit={handleAddTask}
        />
    );
};
