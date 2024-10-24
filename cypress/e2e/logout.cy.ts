describe('Logout', () => {
	it('Should log out', () => {
		cy.login();
		cy.get('[data-testid="logout-button"]').click();
		cy.url().should('contain', '/sign-in');
	});
});
