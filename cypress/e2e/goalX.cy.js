import {TEST_ID_ACCOUNT, TEST_ID_ADD_TASK, TEST_ID_COMMON, TEST_ID_EDIT_TASK, TEST_ID_GOAL, TEST_ID_TASK} from '../../src/constant/dataTest';
import {KEY_TASK} from '../../src/core/SWRKeys';
import {random} from '../../src/helpers/random';

const taskName = `Task Name ${random(20, 100)}`;
const priceValue = `1000`;
const newName = `Task Name ${random(50, 100)}`;
const newPriceValue = `2000`;
const SELECT_SELECTOR = TEST_ID_ACCOUNT.SELECT;

const url = '/goal/test-task';
const taskUrl = `${KEY_TASK}?goalId=*`;
const hostname = 'localhost';

describe('Gaol X Page', () => {
    it('Create task', () => {
        cy.intercept({
            hostname,
            method: 'POST',
            url: taskUrl,
        }).as('addTask');
        cy.intercept({hostname, method: 'GET', url: taskUrl}).as('getTask');
        cy.visit(url);
        cy.get(`[data-testid="${TEST_ID_GOAL.ADD_GOAL}"]`).click();
        cy.wait(1000);
        cy.get(`[data-testid="${TEST_ID_ADD_TASK.NAME}"]`).focus().type(taskName).should('have.value', taskName);
        cy.get(`[data-testid="${TEST_ID_ADD_TASK.PRICE}"]`).focus().clear().type(priceValue).should('have.value', priceValue);
        cy.get(`#${SELECT_SELECTOR}`).click().get(`#${SELECT_SELECTOR}-dropdown`).find(`#${SELECT_SELECTOR}-dropdown-item-0`).click();
        cy.get(`[data-testid="${TEST_ID_ADD_TASK.SUBMIT}"]`).click();
        cy.wait('@addTask');
        cy.wait('@getTask');
        cy.get(`[data-testid="${TEST_ID_TASK.LIST}"]`).contains(taskName).should('have.text', taskName);
    });

    it('Edit task', () => {
        cy.intercept({
            hostname,
            method: 'PUT',
            url: taskUrl,
        }).as('updateTask');
        cy.intercept({hostname, method: 'GET', url: taskUrl}).as('getTask');
        cy.visit(url);
        cy.wait(1000);
        cy.get(`[data-testid="${TEST_ID_TASK.LIST}"] [data-testid="${TEST_ID_TASK.ITEM}"]`)
            .last()
            .trigger('mousedown', 'center')
            .trigger('mousemove', {clientX: 500})
            .trigger('mouseup');
        cy.get(`[data-testid="${TEST_ID_TASK.LIST}"] [data-testid="${TEST_ID_COMMON.EDIT_BUTTON}"]`).last().click();
        cy.wait(1000);
        cy.get(`[data-testid="${TEST_ID_EDIT_TASK.NAME}"]`).focus().clear().type(newName).should('have.value', newName);
        cy.get(`[data-testid="${TEST_ID_EDIT_TASK.PRICE}"]`).focus().clear().type(newPriceValue).should('have.value', newPriceValue);
        cy.get(`[data-testid="${TEST_ID_EDIT_TASK.SUBMIT}"]`).click();
        cy.wait('@updateTask');
        cy.wait('@getTask');
        cy.get(`[data-testid="${TEST_ID_TASK.LIST}"]`).contains(newName).should('have.text', newName);
    });

    it('Checked task', () => {
        cy.intercept({
            hostname,
            method: 'PATCH',
            url: taskUrl,
        }).as('checkTask');
        cy.visit(url);
        cy.wait(1000);
        cy.get(`[data-testid="${TEST_ID_TASK.LIST}"] [data-testid="${TEST_ID_TASK.TASK_ITEM_NAME}"]`)
            .last()
            .trigger('mousedown', 'center')
            .trigger('mousemove', {clientX: 500})
            .trigger('mouseup');
        cy.get(`[data-testid="${TEST_ID_TASK.LIST}"] [data-testid="${TEST_ID_COMMON.ACCEPT_BUTTON}"]`).last().click();
        cy.wait('@checkTask');
        cy.get(`[data-testid="${TEST_ID_TASK.LIST}"] [data-testid="${TEST_ID_TASK.TASK_ITEM_NAME}"]`)
            .last()
            .trigger('mousedown', 'center')
            .trigger('mousemove', {clientX: 500})
            .trigger('mouseup');
        cy.wait(2000);
        cy.get(`[data-testid="${TEST_ID_TASK.LIST}"] [data-testid="${TEST_ID_COMMON.ACCEPT_BUTTON}"]`).last().click();
        cy.wait('@checkTask');
    });

    it('Remove task', () => {
        cy.intercept({
            hostname,
            method: 'DELETE',
            url: taskUrl,
        }).as('removeTask');
        cy.visit(url);
        cy.wait(1000);
        cy.get(`[data-testid="${TEST_ID_TASK.LIST}"] [data-testid="${TEST_ID_TASK.ITEM}"]`)
            .last()
            .trigger('mousedown', 'center')
            .trigger('mousemove', {clientX: 500})
            .trigger('mouseup');
        cy.wait(2000);
        cy.get(`[data-testid="${TEST_ID_TASK.LIST}"] [data-testid="${TEST_ID_COMMON.REMOVE_BUTTON}"]`).last().click();
        cy.wait('@removeTask');
    });
});
