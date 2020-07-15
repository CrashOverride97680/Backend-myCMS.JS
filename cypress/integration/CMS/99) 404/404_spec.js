/// <reference types="Cypress" />
  // TESTS
  describe('CMS -> 404', () => {
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
          .visit('/404');
      })

    })

    describe('Check all element', () => {
      it('Check image exist in page', () => {
        cy
          .get('.box-text img')
          .should('be.visible');
      })

      it('Check text exist in page', () => {
        cy
          .get('.box-text h1')
          .should('be.visible')
          .contains('Opss... something went wrong');
      })
    })
  })
