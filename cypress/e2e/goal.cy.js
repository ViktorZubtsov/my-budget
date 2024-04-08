import {TEST_ID_COMMON, TEST_ID_GOAL, TEST_ID_GOAL_ITEM} from '../../src/constant/dataTest';
import {KEY_GOAL_LIST} from '../../src/core/SWRKeys';
import {random} from '../../src/helpers/random';

const testValue = `GoalName ${random(1, 100)}`;

const url = '/';
const goalUrl = `${KEY_GOAL_LIST}?uid=*`;
const hostname = 'localhost';
const goalItemSelector = `[data-testid="${TEST_ID_GOAL.LISTING}"] [data-testid="${TEST_ID_GOAL_ITEM.GOAL_ITEM}"]`;
const goalItemButton = `[data-testid="${TEST_ID_COMMON.REMOVE_BUTTON}"]`;

// TODO: Переписать, добавить создание описание и поиск его в списке https://linear.app/mybudget/issue/MY-41

describe('Gaol Page', () => {
    it('CRUD goal', () => {
        cy.intercept({
            hostname,
            method: 'POST',
            url: goalUrl,
        }).as('addGoal');
        cy.visit(url);
        cy.get(`[data-testid="${TEST_ID_GOAL.ADD_GOAL}"]`).click();
        cy.get(`#${TEST_ID_GOAL.GOAL_NAME_INPUT}`).focus().type(testValue).should('have.value', testValue);
        cy.get(`#${TEST_ID_GOAL.GOAL_SUBMIT}`).click();
        cy.wait('@addGoal');
        cy.get(goalItemSelector)
            .last()
            .should('have.text', testValue)
            .trigger('mousedown', 'right')
            .trigger('mousemove', {clientX: 600})
            .trigger('mouseup');
        cy.wait(2000);
        cy.get(goalItemButton).last().click();
        cy.get(goalItemSelector).last().should('have.text', testValue);
    });
});
