import CryptoJS from 'crypto-js';

describe("Authentication", () => {
  it("user logs out", () => {
    const password = 'th3_p4ss'

    cy.appFactories([
      ['create', 'user', { password: CryptoJS.SHA1(password).toString() }]
    ]).then(users => {
      const user = users[0]
      cy.visit('/')

      cy.get('input#edtUsername').type(user.username)
      cy.get('input#edtPassword').type(password)
      cy.get('button[data-test-id="btnSignIn"]').click()
      cy.get('div#header button[data-test-id="btnLogout"]').click()

      cy.url().should('eq', window.location.origin + '/')
    })
  })
})
