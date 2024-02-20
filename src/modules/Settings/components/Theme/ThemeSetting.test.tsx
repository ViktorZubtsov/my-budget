import {render, screen} from '@testing-library/react';
import {expect, test} from 'vitest';

import Provider from '@/core/provider';

import {ThemeSetting} from './index';

const component = (
    <Provider>
        <ThemeSetting handleApprove={() => {}} />
    </Provider>
);

test('Page', () => {
    render(component);
    expect(screen.getByText('Тема'));
});
