import {LOCAL_STORAGE_KEYS, THEME} from '../../src/constant';
import {TEST_ID_ACCOUNT, TEST_ID_SOUND_SETTING, TEST_ID_THEME} from '../../src/constant/dataTest';
import {random} from '../../src/helpers/random';

const SELECT_SELECTOR = TEST_ID_ACCOUNT.SELECT;
const testValue = `New Account ${random(1, 100)}`;
const url = '/settings';

describe('Settings Page', () => {
    it('Add New Account', () => {
        cy.visit(url);
        cy.get(`#${SELECT_SELECTOR}`).click().get(`#${SELECT_SELECTOR}-dropdown`).find(`#${SELECT_SELECTOR}-dropdown-item-0`).click();
        cy.get(`#${TEST_ID_ACCOUNT.NAME}`).focus().type(testValue).should('have.value', testValue);
        cy.get(`#${TEST_ID_ACCOUNT.ADD_ACCOUNT}`).click();
        cy.wait(2000);
        cy.get(`[data-testid="${TEST_ID_ACCOUNT.LIST}"] div`).last().should('have.text', testValue);
    });

    it('SoundSetting', () => {
        cy.visit(url, {
            onBeforeLoad(win) {
                win.localStorage.setItem(LOCAL_STORAGE_KEYS.VIBRATION, 'false');
            },
        });
        cy.get(`[data-testid="${TEST_ID_SOUND_SETTING.SOUND_SETTING_SWITCH}"]`)
            .click()
            .should(() => {
                expect(localStorage.getItem(LOCAL_STORAGE_KEYS.VIBRATION)).to.eq('true');
            });
    });

    it('ThemeSetting', () => {
        cy.visit(url, {
            onBeforeLoad(win) {
                win.localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, THEME.DARK_SBER);
            },
        });

        cy.get(`#${TEST_ID_THEME.THEME_SETTING_RADIO}-${THEME.DARK_EVA} + label`).click();

        cy.get(`#${TEST_ID_THEME.THEME_SETTING_APPROVE}`)
            .click()
            .should(() => {
                expect(localStorage.getItem(LOCAL_STORAGE_KEYS.THEME)).to.eq(THEME.DARK_EVA);
            });

        cy.get(`#${TEST_ID_THEME.THEME_SETTING_RADIO}-${THEME.DARK_JOY} + label`).click();

        cy.get(`#${TEST_ID_THEME.THEME_SETTING_APPROVE}`)
            .click()
            .should(() => {
                expect(localStorage.getItem(LOCAL_STORAGE_KEYS.THEME)).to.eq(THEME.DARK_JOY);
            });

        cy.get(`#${TEST_ID_THEME.THEME_SETTING_RADIO}-${THEME.DARK_SBER} + label`).click();

        cy.get(`#${TEST_ID_THEME.THEME_SETTING_APPROVE}`)
            .click()
            .should(() => {
                expect(localStorage.getItem(LOCAL_STORAGE_KEYS.THEME)).to.eq(THEME.DARK_SBER);
            });
    });
});
