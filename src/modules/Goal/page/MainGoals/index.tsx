import {IconApps, IconTimerStroke} from '@salutejs/plasma-icons';
import {H5, TabItem, Tabs} from '@salutejs/plasma-ui';

import {useTabs} from '@/hooks';
import {ActiveGoals} from '@/modules/Goal/components/GoalsListing/ActiveGoals';
import {ArchiveGoals} from '@/modules/Goal/components/GoalsListing/ArchiveGoals';

import {MainGoals} from './styled';

export default function MainGoalsPage() {
    const {currentTab, setCurrentTab} = useTabs({});

    return (
        <MainGoals>
            <Tabs size="l" view="secondary" stretch={true} pilled={false} scaleOnPress={true} outlined={false} index={currentTab} animated={true}>
                <TabItem contentLeft={<IconApps size="s" color="inherit" />} onClick={() => setCurrentTab(0)}>
                    <H5> Список целей</H5>
                </TabItem>
                <TabItem contentLeft={<IconTimerStroke size="s" color="inherit" />} onClick={() => setCurrentTab(1)}>
                    <H5>Архив</H5>
                </TabItem>
            </Tabs>
            {0 === currentTab && <ActiveGoals />}
            {1 === currentTab && <ArchiveGoals />}
        </MainGoals>
    );
}
