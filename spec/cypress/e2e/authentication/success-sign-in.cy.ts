import CryptoJS from 'crypto-js';

describe("Authentication", () => {
  it('user sign in successfully',() => {
    cy.app('clean')
    cy.appEval('Rails.application.load_seed')

    const password = 'th3_p4ss'

    cy.appFactories([
      ['create', 'user', { password: CryptoJS.SHA1(password).toString() }]
    ]).then(users => {
      const user = users[0]
      cy.visit('/')

      cy.get('input#edtUsername').type(user.username)
      cy.get('input#edtPassword').type(password)
      cy.get('button[data-test-id="btnSignIn"]').click()

      cy.get('div#header #current-user span').should('have.text', user.username)
    })
  })
})
