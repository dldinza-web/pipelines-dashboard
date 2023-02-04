import { faker } from '@faker-js/faker';
import CryptoJS from 'crypto-js';

describe('Dashboard', () => {
  const user = {
    username: faker.internet.email(),
    password: faker.internet.password(),
  }

  beforeEach(() => {
    cy.app('clean')
    cy.appFactories([
      ['create', 'user', { username: user.username, password: CryptoJS.SHA1(user.password).toString() }]
    ])
    cy.appEval('FactoryBot.create(:project, :with_pipeline_statuses)')

    cy.visit('/')

    cy.get('input#edtUsername').type(user.username)
    cy.get('input#edtPassword').type(user.password)
    cy.get('button[data-test-id="btnSignIn"]').click()
  })

  it('assign user to a project', () => {
    cy.get('div[data-test-id="project-list"] .project-box')
      .first()
      .within(() => {
        cy.get('div[data-test-id="accordion-header"]')
          .click()

        cy.get('button.btnJoin')
          .click()

        cy.get('div.username')
          .should(($items) => {
            expect($items).to.have.length(1)

            expect($items.first()).to.have.text(user.username)
          })
      })
  })

  it('show signal current user is assigned to the project', () => {
    cy.get('div[data-test-id="project-list"] .project-box')
      .first()
      .within(() => {
        cy.get('svg.current-user-assigned')
          .should('not.exist')

        cy.get('div[data-test-id="accordion-header"]')
          .click()

        cy.get('button.btnJoin')
          .click()

        cy.get('svg.current-user-assigned')
          .should('be.visible')
      })
  })

  it('join button does not do anything if the user is already assigned', () => {
    cy.get('div[data-test-id="project-list"] .project-box')
      .first()
      .within(() => {
        cy.get('div[data-test-id="accordion-header"]')
          .click()

        new Array(1,2).forEach(() => {
          // click the button multiple times
          cy.get('button.btnJoin')
            .click()

          // the content is the same
          cy.get('div.username')
            .should(($items) => {
              expect($items).to.have.length(1)

              expect($items.first()).to.have.text(user.username)
            })
        })
      })
  })
})
