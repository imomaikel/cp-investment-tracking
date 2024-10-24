/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
	interface Chainable {
		login(): Chainable<Element>;
		visitBaseUrl(): Chainable<Element>;
	}
}

Cypress.Commands.add('visitBaseUrl', () => {
	cy.visit('http://localhost:3000');
});

Cypress.Commands.add('login', () => {
	cy.visitBaseUrl();
	cy.get('[data-testid="email-input"]').type(Cypress.env('email'));
	cy.get('[data-testid="password-input"]').type(Cypress.env('password'));
	cy.get('[data-testid="submit-auth"]').click();
	cy.get('h1').should('contain', 'Investment Tracker');
});
