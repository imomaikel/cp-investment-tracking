describe('Check if the aggregated data is correct', () => {
	it('Should compare data', () => {
		cy.login();

		let totalInvestment = 0;
		let totalCurrentValue = 0;
		cy.get('table:first > tbody > tr')
			.each(($el) => {
				const quantity = parseInt(
					$el.find('[data-testclass="field-quantity"]').text()
				);
				const buyPrice = parseFloat(
					$el.find('[data-testclass="field-buyPrice"]').text()
				);
				const currentPrice = parseFloat(
					$el.find('[data-testclass="field-currentPrice"]').text()
				);

				totalInvestment += buyPrice * quantity;
				totalCurrentValue += quantity * currentPrice;
			})
			.then(() => {
				const totalProfit = totalCurrentValue - totalInvestment;

				const formatter = new Intl.NumberFormat('en-DE');

				cy.get('[data-testid="result-totalInvestment"]').should(
					'have.text',
					formatter.format(totalInvestment)
				);
				cy.get('[data-testid="result-totalCurrentValue"]').should(
					'have.text',
					formatter.format(totalCurrentValue)
				);
				cy.get('[data-testid="result-totalProfit"]').should(
					'have.text',
					formatter.format(totalProfit)
				);
			});
	});
});
