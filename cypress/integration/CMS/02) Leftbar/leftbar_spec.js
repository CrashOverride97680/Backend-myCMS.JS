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

      describe('Check if group nav CMS with link and dropdown exist and is visible', () => {
        it('CMS group nav', () => {
          cy
            .get('.nav-group strong')
            .contains('Cms')
            .should('be.visible');
        })

        it('Addons group nav', () => {
          cy
            .get('.nav-group strong')
            .contains('Addons')
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

          describe('Check if dropdown work', () => {
            it('Check element if is closed', () => {
              cy
                .get('#jobCollapse')
                .should('not.be.visible');
            })

            it('Check if click work', () => {
              cy
                .get('.nav-item a')
                .contains('Job Board')
                .click();
            })

            describe('Check if links exist', () => {
              it('Check if link posts exist', () => {
                cy
                  .get('.nav-item a.linkCollapse')
                  .contains('Posts');
              })

              it('Check if link media exist', () => {
                cy
                  .get('.nav-item a.linkCollapse')
                  .contains('Media');
              })

              it('Check if link posts exist', () => {
                cy
                  .get('.nav-item a.linkCollapse')
                  .contains('Pages');
              })

              it('Check if link seo / sem exist', () => {
                cy
                  .get('.nav-item a.linkCollapse')
                  .contains('Seo / sem');
              })

              it('Check if link comments exist', () => {
                cy
                  .get('.nav-item a.linkCollapse')
                  .contains('Comments');
              })
            })

            describe('Check if close', () => {
              it('Close collapse', () => {
                cy
                  .get('.nav-item a')
                  .contains('Job Board')
                  .click();
              })

              it('Check element if is effective closed', () => {
                cy
                  .get('#jobCollapse')
                  .should('not.be.visible');
              })
            })

          })
        })

        describe('Utilities', () => {
          describe('Check if button exist and is visible', () => {
            it('Check if icon exist', () => {
              cy
                .get('.nav-item a fa-icon[icon=toolbox]')
                .should('be.visible');
            })

            it('Check if link exist', () => {
              cy
                .get('.nav-item a')
                .contains('Utilities')
                .should('be.visible');
            })

            it('Check if arrow exist', () => {
              cy
                .get('.nav-item a[title="Utilities"] fa-icon[icon=chevron-right]')
                .should('be.visible');
            })
          })

          describe('Check if dropdown work', () => {
            it('Check element if is closed', () => {
              cy
                .get('#collapseUtilities')
                .should('not.be.visible');
            })

            it('Check if click work', () => {
              cy
                .get('.nav-item a')
                .contains('Utilities')
                .click();
            })

            describe('Check if links exist', () => {
              it('Check if link themes exist', () => {
                cy
                  .get('.nav-item a.linkCollapse')
                  .contains('Themes');
              })

              it('Check if link widgets exist', () => {
                cy
                  .get('.nav-item a.linkCollapse')
                  .contains('Widgets');
              })

              it('Check if link menus exist', () => {
                cy
                  .get('.nav-item a.linkCollapse')
                  .contains('Menus');
              })

              it('Check if link Header exist', () => {
                cy
                  .get('.nav-item a.linkCollapse')
                  .contains('Header');
              })

              it('Check if link Users exist', () => {
                cy
                  .get('.nav-item a.linkCollapse')
                  .contains('Users');
              })
            })

            describe('Check if close', () => {
              it('Close collapse', () => {
                cy
                  .get('.nav-item a')
                  .contains('Utilities')
                  .click();
              })

              it('Check element if is effective closed', () => {
                cy
                  .get('#collapseUtilities')
                  .should('not.be.visible');
              })
            })
          })
        })

        describe('Chart', () => {
          describe('Check if button exist and is visible', () => {
            it('Check if icon exist', () => {
              cy
                .get('.nav-item a fa-icon[icon=chart-line]')
                .should('be.visible');
            })

            it('Check if link exist', () => {
              cy
                .get('.nav-item a')
                .contains('Chart')
                .should('be.visible');
            })

            it('Check if arrow exist', () => {
              cy
                .get('.nav-item a[title="Chart"] fa-icon[icon=chevron-right]')
                .should('be.visible');
            })
          })

          describe('Check if dropdown work', () => {
            it('Check element if is closed', () => {
              cy
                .get('#collapseChart')
                .should('not.be.visible');
            })

            it('Check if click work', () => {
              cy
                .get('.nav-item a')
                .contains('Chart')
                .click();
            })

            describe('Check if links exist', () => {
              it('Check if link themes exist', () => {
                cy
                  .get('.nav-item a.linkCollapse')
                  .contains('All');
              })

              it('Check if link widgets exist', () => {
                cy
                  .get('.nav-item a.linkCollapse')
                  .contains('Earning');
              })

              it('Check if link menus exist', () => {
                cy
                  .get('.nav-item a.linkCollapse')
                  .contains('Social');
              })

            })

            describe('Check if close', () => {
              it('Close collapse', () => {
                cy
                  .get('.nav-item a')
                  .contains('Chart')
                  .click();
              })

              it('Check element if is effective closed', () => {
                cy
                  .get('#collapseChart')
                  .should('not.be.visible');
              })
            })
          })
        })

        describe('Add', () => {
          describe('Check if button exist and is visible', () => {
            it('Check if icon exist', () => {
              cy
                .get('.nav-item a fa-icon[icon=plus]')
                .should('be.visible');
            })

            it('Check if link exist', () => {
              cy
                .get('.nav-item a')
                .contains('Add')
                .should('be.visible');
            })

            it('Check if arrow exist', () => {
              cy
                .get('.nav-item a[title="Add"] fa-icon[icon=chevron-right]')
                .should('be.visible');
            })
          })

          describe('Check if dropdown work', () => {
            it('Check element if is closed', () => {
              cy
                .get('#collapseAdd')
                .should('not.be.visible');
            })

            it('Check if click work', () => {
              cy
                .get('.nav-item a')
                .contains('Add')
                .click();
            })

            describe('Check if links exist', () => {
              it('Check if link plugins exist', () => {
                cy
                  .get('.nav-item a.linkCollapse')
                  .contains('Plugins');
              })

              it('Check if link widgets exist', () => {
                cy
                  .get('.nav-item a.linkCollapse')
                  .contains('Widgets');
              })
            })

            describe('Check if close', () => {
              it('Close collapse', () => {
                cy
                  .get('.nav-item a')
                  .contains('Add')
                  .click();
              })

              it('Check element if is effective closed', () => {
                cy
                  .get('#collapseAdd')
                  .should('not.be.visible');
              })
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
