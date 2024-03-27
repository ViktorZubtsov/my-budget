import {useAccount} from '@/modules/Settings/hooks/useAccount';
import {TaskEditor, TTaskFields} from '@/modules/Task/components/TaskEditor';
import {useTask} from '@/modules/Task/hooks/useTask';

const TITLE = 'Создать задачу';

interface IAddTask {
    isOpen: boolean;
    onClose: () => void;
}
export const AddTask = ({onClose, isOpen}: IAddTask) => {
    const {createTask, isCreateLoader} = useTask();
    const {accountsList, addAccount, isMutating} = useAccount();

    const handleAddTask = ({price, name, bankAccount}: TTaskFields) => {
        createTask({
            bankAccount,
            name,
            price,
        }).then(onClose);
    };

    return (
        <TaskEditor
            accountsList={accountsList}
            isOpen={isOpen}
            onClose={onClose}
            title={TITLE}
            isAccountsFetching={isMutating}
            isFetching={isCreateLoader}
            isEdit
            addAccount={addAccount}
            onSubmit={handleAddTask}
        />
    );
};
