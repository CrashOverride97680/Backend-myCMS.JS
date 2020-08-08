/// <reference types="Cypress" />
// IMPORTING DATA USER
import { user as u } from '../data';
import * as be from "cypress";
// VARIABLES FOR TESTING
const testUserSuccess = u.success;
// TESTS
  describe('CMS -> leftbar', () => {
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

    describe('Testing leftbar', () => {
      describe('Check if logo exist and is visible', () => {
        it('Rocket logo', () => {
          cy
            .get('.logoHome fa-icon[icon=rocket]')
            .should('be.visible');
        })

        it('Text logo', () => {
          cy
            .get('.logoHome strong')
            .contains('myCMS.JS')
            .should('be.visible');
        })
      })

      describe('Check link dashboard and is visible', () => {
        it('Check if icon exist', () => {
          cy
            .get('fa-icon[icon=tachometer-alt]')
            .should('be.visible');
        })

        it('Check if link exist', () => {
          cy
            .get('a[href="/dashboard"]')
            .contains('Dashboard')
            .should('be.visible');
        })
      })

      describe('Check if group nav CMS with link exist and is visible', () => {
        it('CMS group nav', () => {
          cy
            .get('.nav-group strong')
            .contains('Cms')
            .should('be.visible');
        })

        describe('Job Board', () => {
          describe('Check if button exist and is visible', () => {
            it('Check if icon exist', () => {
              cy
                .get('.nav-item a fa-icon[icon=clipboard]')
                .should('be.visible');
            })

            it('Check if link exist', () => {
              cy
                .get('.nav-item a')
                .contains('Job Board')
                .should('be.visible');
            })

            it('Check if arrow exist', () => {
              cy
                .get('.nav-item a[title="Job Board"] fa-icon[icon=chevron-right]')
                .should('be.visible');
            })
          })
        })
      })
    })

    describe('Logout', () => {
      it('Check element exist', () => {
        cy
          .get('a')
          .contains('Logout')
          .should('be.visible');
      })

      it('Click logout', () => {
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
