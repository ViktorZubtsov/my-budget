import {TEST_ID_ACCOUNT, TEST_ID_ADD_TASK, TEST_ID_GOAL, TEST_ID_GOAL_ITEM, TEST_ID_TASK} from '../../src/constant/dataTest';
import {random} from '../../src/helpers/random';

const testValue = `GoalName ${random(1, 100)}`;
const taskName = `Task Name ${random(1, 100)}`;
const priceValue = `1000`;
const SELECT_SELECTOR = TEST_ID_ACCOUNT.SELECT;

const url = '/';
const goalItemSelector = `[data-testid="${TEST_ID_GOAL.LISTING}"] [data-testid="${TEST_ID_GOAL_ITEM.GOAL_ITEM}"]`;

describe('Gaol X Page', () => {
    it('Create goal', () => {
        cy.visit(url);
        cy.get(`[data-testid="${TEST_ID_GOAL.ADD_GOAL}"]`).click();
        cy.get(`#${TEST_ID_GOAL.GOAL_NAME_INPUT}`).focus().type(testValue).should('have.value', testValue);
        cy.get(`#${TEST_ID_GOAL.GOAL_SUBMIT}`).click();
        cy.get(goalItemSelector).last().click();
        cy.wait(1500);
        cy.get(`[data-testid="${TEST_ID_GOAL.ADD_GOAL}"]`).click();
        cy.wait(1000);
        cy.get(`[data-testid="${TEST_ID_ADD_TASK.NAME}"]`).focus().type(taskName).should('have.value', taskName);
        cy.get(`[data-testid="${TEST_ID_ADD_TASK.PRICE}"]`).focus().clear().type(priceValue).should('have.value', priceValue);
        cy.get(`#${SELECT_SELECTOR}`).click().get(`#${SELECT_SELECTOR}-dropdown`).find(`#${SELECT_SELECTOR}-dropdown-item-0`).click();
        cy.get(`[data-testid="${TEST_ID_ADD_TASK.SUBMIT}"]`).click();
        cy.wait(1500);
        cy.get(`[data-testid="${TEST_ID_TASK.LIST}"] [data-testid="${TEST_ID_TASK.TASK_ITEM_NAME}"]`).last().should('have.text', taskName);
    });
});
