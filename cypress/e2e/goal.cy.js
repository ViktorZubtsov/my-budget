import {TEST_ID_GOAL} from '../../src/constant/dataTest';

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const testValue = `Goal ${random(1, 100)}`;
const url = '/';
describe('Gaol Page', () => {
    it('Add goal', () => {
        cy.visit(url);
        cy.get(`#${TEST_ID_GOAL.ADD_GOAL}`).click();
        cy.get(`#${TEST_ID_GOAL.GOAL_NAME_INPUT}`).focus().type(testValue).should('have.value', testValue);
        cy.get(`#${TEST_ID_GOAL.GOAL_NAME_DESCRIPTION}`).focus().type(testValue).should('have.value', testValue);
        cy.get(`#${TEST_ID_GOAL.GOAL_SUBMIT}`).click();
    });
});
