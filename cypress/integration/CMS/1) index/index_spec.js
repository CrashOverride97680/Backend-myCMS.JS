/// <reference types="Cypress" />
// IMPORTING DATA USER
import { user } from '../data';
// VARIABLES FOR TESTING
const testUserSuccess = user.success;

const testErrorUser = user.error;

// TESTS
  describe('CMS -> /', () => {
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

    describe('Check elements if exist', () => {

      it('Element input email', () => {
        cy
          .get('input[placeholder=Email]')
          .should('be.visible');
      })

      it('Element input password', () => {
        cy
          .get('input[placeholder=Password]')
          .should('be.visible');
      })

      it('Element button submit', () => {
        cy
          .get('button[type=submit]')
          .contains('Submit')
          .should('be.visible');
      })
    })

    describe('Test for autocomplete Error --> Auth', () => {
      it('Username autocomplete', () => {
        cy
          .get('input[placeholder=Email]')
          .should('be.visible')
          .type(testErrorUser.username)
          .blur();
      })

      it('Password autocomplete', () => {
        cy
          .get('input[placeholder=Password]')
          .should('be.visible')
          .type(testErrorUser.password)
          .blur();
      })

      it('Click button', () => {
        cy
          .get('button[type=submit]')
          .contains('Submit')
          .should('be.visible')
          .click();
      })

      it('Check if toast visible', () => {
        cy
          .get('.toast')
          .should('be.visible');
      })

      it('Close button', () => {
        cy
          .get('button.close')
          .click();
      })
  })

  describe('Empty input for another validation', () => {
    it('Clean input email', () => {
      cy
        .get('input[placeholder=Email]')
        .clear();
    })

    it('Clean input password', () => {
      cy
        .get('input[placeholder=Password]')
        .clear();
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
