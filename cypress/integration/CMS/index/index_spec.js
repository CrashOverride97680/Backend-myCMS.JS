/// <reference types="Cypress" />
// TESTS
  describe('CMS -> /', () => {
    describe('Set viewport and route for test', () => {
      it('Setting viewport', () => {
        cy
          .viewport('macbook-15');
      })
  
      it('Page respond', () => {
        cy
          .visit('/');
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
  
      it('Element checkbox session', () => {
        cy
          .get('input#sessionSavedCheckbox[type=checkbox]')
          .should('be.visible')
          .uncheck();
  
        cy
          .get('label[for=sessionSaved]')
          .contains('Save session')
          .should('be.visible');
      })
  
      it('Element button submit', () => {
        cy
          .get('button[type=button]')
          .contains('Submit')
          .should('be.visible');
      })
    })  
  
  })