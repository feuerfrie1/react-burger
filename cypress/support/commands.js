import 'cypress-drag-drop'

Cypress.Commands.add('prepare', (email, password) => {
  cy.intercept('POST', 'api/auth/login', {fixture: 'login.json'}).as("postLogin")
  cy.visit('http://localhost:3000/react-burger#/login')
  cy.get('[data-testid=email-input]').type(`${email}`)
  cy.get('[data-testid=password-input]').type(`${password}{enter}`)
  cy.wait("@postLogin").its("request.body").should("deep.equal", {
    email: '1@1.com',
    password: '123'
  })
})