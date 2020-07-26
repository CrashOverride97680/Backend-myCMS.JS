/// <reference types="Cypress" />
// IMPORTING DATA USER
import { user as u } from '../data';
// VARIABLES FOR TESTING
const testUserSuccess = u.success;
// TESTS
  describe('CMS -> admin-panel', () => {
    describe('Set viewport and route for test', () => {
      it('Setting viewport', () => {
        cy
          .viewport('macbook-15');
      })

      it('Serving cypress', () => {
        cy
          .server()
      })

      it('Page respond', () => {
        cy
          .visit('/');
      })

    })

    describe('Clear localStorage', () => {
      it('Clear execution', () => {
        cy
          .clearLocalStorage().should('be.empty');
      })
    })

    describe('Test for autocomplete Success --> Auth', () => {
      it('Username autocomplete', () => {
        cy
          .get('input[placeholder=Email]')
          .should('be.visible')
          .type(testUserSuccess.username)
          .blur();
      })

      it('Password autocomplete', () => {
        cy
          .get('input[placeholder=Password]')
          .should('be.visible')
          .type(testUserSuccess.password)
          .blur();
      })

      it('Click button', () => {
        cy
          .get('button[type=submit]')
          .contains('Submit')
          .should('be.visible')
          .click();
      })

      it('Check if login is execute', () => {
        const token = localStorage.getItem('token');
        if(!token)
          return false;
      })
    })
  })
