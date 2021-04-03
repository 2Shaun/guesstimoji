describe('testing the game', () => {
    it('can make a game', () => {
        cy.visit('http://reactApp:80');
        cy.findByTestId('roomId').focus().clear().type('testGame');
        cy.findByRole('button', { name: 'PLAY' }).click();
        cy.get('h3').should('have.text', 'Room Name: testGame');
        cy.get('.choice').should('have.text', 'Pick your emoji!');
        cy.get(':nth-child(3) > :nth-child(4) > :nth-child(6)').click();
        cy.get('.choice').should('have.text', 'You picked 🤪.');
        cy.get(':nth-child(3) > :nth-child(4) > :nth-child(6)')
            .click()
            .should('have.text', '█');
    });
});
