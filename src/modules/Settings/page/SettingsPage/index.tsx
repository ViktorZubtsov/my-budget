import {Container} from '@salutejs/plasma-ui';
import {useRouter} from 'next/router';

import {PageHeader} from '../../../../components/PageHeader';
import {LOCAL_STORAGE_KEYS} from '../../../../constant';
import {AccountsCard} from '../../components/AccountsCard';
import {SoundSetting} from '../../components/Sound';
import {ThemeSetting} from '../../components/Theme';
import {useAccount} from '../../hooks/useAccount';
import {SettingsPageContent} from './styled';

const SettingsPage = () => {
    const {push} = useRouter();
    const {accountsList, addAccount, isMutating} = useAccount();

    return (
        <Container>
            <div>
                <PageHeader title="Настройки" onClick={() => push('/')} />
                <SettingsPageContent>
                    <AccountsCard accountsList={accountsList} addAccount={addAccount} isFetching={isMutating} />
                    <SoundSetting isChecked={Boolean('true' === localStorage.getItem(LOCAL_STORAGE_KEYS.VIBRATION))} />
                    <ThemeSetting handleApprove={() => location.reload()} />
                </SettingsPageContent>
            </div>
        </Container>
    );
};

export default SettingsPage;
