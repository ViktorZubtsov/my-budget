'use client';
import {IconBankCardAlt1, IconFolder} from '@salutejs/plasma-icons';
import {TabItem, Tabs} from '@salutejs/plasma-ui';
import {H4} from '@salutejs/plasma-web';

import {useTabs} from '@/hooks';
import {IAccount, TTask} from '@/model';
import {GoalXListingStyled} from '@/modules/Goal/components/GoalXListing/styled';
import {TaskListing} from '@/modules/Task/sectoin/TaskListing';
import {TasksChart} from '@/modules/Task/sectoin/TasksChart';

export const GoalXListing = ({taskList, accountsList}: {taskList: TTask[]; accountsList: IAccount[]}) => {
    const {currentTab, setCurrentTab} = useTabs({});

    return (
        <GoalXListingStyled>
            <Tabs size="l" view="secondary" stretch={true} pilled={false} scaleOnPress={true} outlined={false} index={currentTab} animated={true}>
                <TabItem contentLeft={<IconFolder size="s" color="inherit" />} onClick={() => setCurrentTab(0)}>
                    <H4>Список</H4>
                </TabItem>
                <TabItem contentLeft={<IconBankCardAlt1 size="s" color="inherit" />} onClick={() => setCurrentTab(1)}>
                    <H4>График</H4>
                </TabItem>
            </Tabs>
            <div>
                {0 === currentTab && <TaskListing accountsList={accountsList} taskList={taskList} />}
                {1 === currentTab && <TasksChart taskList={taskList} />}
            </div>
        </GoalXListingStyled>
    );
};
