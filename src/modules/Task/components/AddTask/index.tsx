import {useAccount} from '@/modules/Settings/hooks/useAccount';

const TITLE = 'Создать задачу';

import {mobileVibrate} from '../../../../helpers';
import {useFetch} from '../../../../hooks';
import {IAccount, TTask} from '../../../../model';
import {useTask} from '../../hooks/useTask';
import {TaskEditor, TTaskFields} from '../TaskEditor';

interface IAddTask {
    isOpen: boolean;
    onClose: () => void;
}
export const AddTask = ({onClose, isOpen}: IAddTask) => {
    const {} = useTask();
    const {accountsList} = useAccount();
    const {isFetching, setIsFetching} = useFetch();
    const slug = '';

    const handleAddTask = ({price, name, bankAccount}: TTaskFields) => {
        setIsFetching(true);
        // createTask(String(slug), {
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
            isFetching={isFetching}
            isEdit
            onSubmit={handleAddTask}
        />
    );
};
