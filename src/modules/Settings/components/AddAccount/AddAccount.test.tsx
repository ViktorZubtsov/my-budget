import {render, screen} from '@testing-library/react';
import {expect, test} from 'vitest';

import Provider from '../../../../core/provider';
import {AddGoal} from '../../../Goal/components/AddGoal';
import {GoalEditor} from '../../../Goal/components/GoalEditor';

import {AddAccount} from './index';

const component = <GoalEditor submitText="Создать" title="Создать цель" isOpen={false} isFetch={false} onSubmit={() => {}} handeClose={() => {}} />;

test('Page', () => {
    global.ResizeObserver = class ResizeObserver {
        observe() {
            // do nothing
        }
        unobserve() {
            // do nothing
        }
        disconnect() {
            // do nothing
        }
    };
    render(component);
    expect(screen.getByText('Test'));
});
