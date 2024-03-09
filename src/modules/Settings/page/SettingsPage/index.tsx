import {Container} from '@salutejs/plasma-ui';
import {useRouter} from 'next/router';
import {useCallback, useEffect, useState} from 'react';

import {PageHeader} from '@/components/PageHeader';
import {LOCAL_STORAGE_KEYS} from '@/constant';
import {AccountsCard} from '@/modules/Settings/components/AccountsCard';
import {SoundSetting} from '@/modules/Settings/components/Sound';
import {ThemeSetting} from '@/modules/Settings/components/Theme';
import {useAccount} from '@/modules/Settings/hooks/useAccount';

import {SettingsPageContent} from './styled';

const SettingsPage = () => {
    const {push} = useRouter();
    const {accountsList, addAccount, isMutating} = useAccount();
    const [checked, setChecked] = useState<boolean>(Boolean('true' === localStorage.getItem(LOCAL_STORAGE_KEYS.VIBRATION)));
    const setDefaultValue = useCallback(() => {
        if (!Object.keys(localStorage).includes(LOCAL_STORAGE_KEYS.VIBRATION)) {
            setChecked(true);
            localStorage.setItem(LOCAL_STORAGE_KEYS.VIBRATION, String('true'));
        }
    }, []);

    useEffect(setDefaultValue, [setDefaultValue]);

    return (
        <Container>
            <div>
                <PageHeader title="Настройки" onClick={() => push('/')} />
                <SettingsPageContent>
                    <AccountsCard accountsList={accountsList} addAccount={addAccount} isFetching={isMutating} />
                    <SoundSetting isChecked={checked} />
                    <ThemeSetting handleApprove={() => location.reload()} />
                </SettingsPageContent>
            </div>
        </Container>
    );
};

export default SettingsPage;
