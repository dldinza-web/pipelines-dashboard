describe('Authentication', () => {
  it('show an error message if the credentials are invalid', () => {
    cy.visit('/')

    cy.get('input#edtUsername').type('wrong_username')
    cy.get('input#edtPassword').type('wrong_password')
    cy.get('button[data-test-id="btnSignIn"]').click()

    cy.get('div[data-test-id="messages-box"]').should('exist')
    cy.get('div[data-test-id="messages-box"] .msg-error').should(($messages) => {
      expect($messages).to.have.length(1)

      expect($messages.first()).to.have.text('Invalid username or password')
    })
  })
})
