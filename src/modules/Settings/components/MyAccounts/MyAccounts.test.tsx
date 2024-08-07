import {render} from '@testing-library/react';
import {describe, expect, test} from 'vitest';

import {TEST_MY_ACCOUNTS} from '@/constant/dataTest';
import {MOCK_ACCOUNT} from '@/mock';
import {EMPTY_TEXT} from '@/modules/Settings/components/MyAccounts/constants';
import {MyAccounts} from '@/modules/Settings/components/MyAccounts/index';
import {MAX_ACCOUNT_LENGTH} from '@/modules/Settings/constants';

describe('MyAccounts', () => {
    const {rerender, getByTestId, getByText} = render(<MyAccounts accountsList={[]} />);
    const counterItem = getByTestId(TEST_MY_ACCOUNTS.COUNTER);

    test('Check empty text', () => {
        const emptyText = getByTestId(TEST_MY_ACCOUNTS.EMPTY_TEXT);

        expect(counterItem.textContent).toBe(`0 / ${MAX_ACCOUNT_LENGTH}`);
        expect(emptyText.textContent).toBe(EMPTY_TEXT);
    });

    test('Check account element', () => {
        rerender(<MyAccounts accountsList={[MOCK_ACCOUNT]} />);
        const accountName = getByText(MOCK_ACCOUNT.name);

        expect(counterItem.textContent).toBe(`1 / ${MAX_ACCOUNT_LENGTH}`);
        expect(accountName.textContent).toBe(MOCK_ACCOUNT.name);
    });
});
