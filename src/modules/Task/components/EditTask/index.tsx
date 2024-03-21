import {memo} from 'react';

import {useAccount} from '@/modules/Settings/hooks/useAccount';

import {mobileVibrate} from '../../../../helpers';
import {useFetch} from '../../../../hooks';
import {IAccount, TTask} from '../../../../model';
import {useTask} from '../../hooks/useTask';
import {TaskEditor, TTaskFields} from '../TaskEditor';

const TITLE = 'Изменить задачу';
interface IEditTask {
    isOpen: boolean;
    selectedTask: {price: TTask['price']; bankAccount: TTask['bankAccount']; name: TTask['name']};
    taskId: TTask['id'];
    onClose: () => void;
}
export const EditTask = memo(({onClose, isOpen, selectedTask}: IEditTask) => {
    const {accountsList} = useAccount();
    const {} = useTask();
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
            defaultValues={selectedTask}
            isFetching={isFetching}
            isEdit
            onSubmit={handleSaveTask}
        />
    );
});
