/// <reference types="Cypress" />
// IMPORTING DATA USER
import { user } from '../data';
// VARIABLES FOR TESTING
const testUserSuccess = user.success;
// TESTS
describe('CMS -> logout access', () => {
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

    it('Check if login is execute', (done) => {
      setTimeout(function() {
        cy
          .get('.toast')
          .should('not.be.visible')
          .then($options => done());
      }, 2000);
    })
  })

  describe('Testing logout', () => {
    it('Check element exist', () => {
      cy
        .get('a')
        .contains('Logout')
        .should('be.visible');
    })

    it('Check click logout', () => {
      cy
        .get('a')
        .contains('Logout')
        .click();
    })

    it('Check if token exist', (done) => {
      const token = localStorage.getItem('token');
      if(token === null)
        done();
    })
  })
})
