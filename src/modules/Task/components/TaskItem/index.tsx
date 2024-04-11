import React, {memo} from 'react';
import {SwipeableList, SwipeableListItem, Type as ListType} from 'react-swipeable-list';

import {leadingActionsAccept} from '@/components/TrailingActions/ActionsAccept';
import {trailingActionsEditDelete} from '@/components/TrailingActions/ActionsEditDelete';
import {IAccount, TTask} from '@/model';
import {TaskElement} from '@/modules/Task/components/TaskElement';

interface ITaskItemProps {
    task: TTask;
    accountsList: IAccount[];
    onEdit: (id: TTask['id']) => void;
    onRemove: (id: TTask['id']) => void;
    onAccept: (id: TTask['id']) => void;
    isBlock?: boolean;
}

export const TaskItem = memo<ITaskItemProps>(({task, onAccept, onEdit, onRemove, isBlock, accountsList}) => {
    return (
        <div>
            <SwipeableList fullSwipe={true} type={ListType.IOS}>
                <SwipeableListItem
                    blockSwipe={isBlock}
                    maxSwipe={1}
                    leadingActions={leadingActionsAccept({
                        handleAccept: () => {
                            onAccept(task.id);
                        },
                    })}
                    trailingActions={trailingActionsEditDelete({
                        handleEdit: () => {
                            onEdit(task.id);
                        },
                        handleRemove: () => {
                            onRemove(task.id);
                        },
                    })}
                >
                    <TaskElement task={task} accountsList={accountsList} />
                </SwipeableListItem>
            </SwipeableList>
        </div>
    );
});
