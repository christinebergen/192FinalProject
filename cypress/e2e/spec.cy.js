
describe('The home page loads successfully', () => {
  it('loads sucessfully!', () => {
    cy.visit('/');
  });
});
describe('Testing loading state', () => {
  it('should display the loading state', () => {
    cy.visit('/');
    cy.get('#loading').should('exist');
  });
it('While loading, should not display unloaded state', () => {
  cy.visit('/');
  cy.get('#currentTune').should('not.exist');
  cy.get('#display-current-tune').should('not.exist');
});
it('"Click here to load random tune" shows loading state', () => {
  cy.intercept('https://thesession.org/tunes/popular?format=json&perpage=50').as('getSummary');
  cy.visit('/index.html');
  cy.get('button').contains('Click here to Load Random Tune!').click();
});
});
describe('Test to fetch information from APIs', () => {
  it('Successful response returned from thesession.org API', () => {
    cy.request('https://thesession.org/tunes/popular?format=json&perpage=50')
      .should((response) => {
        expect(response.status).to.eq(200)
      })
  })
  it('Successful response returned from Wikipedia API', () => {
    cy.request('https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=The%20Humours%20of%20Ballyloughlin%20reel&format=json&origin=*')
      .should((response) => {
        expect(response.status).to.eq(200)
      })
  })
});
describe('Test that web links to tunes work', () => {
  it('navagates to tune on the session.org and verifies its title', () => {
    cy.visit('https://thesession.org/tunes/27')
    cy.title().should('include', 'Drowsy Maggie');
  });
});
describe('Button click test', () => {
  it('Should display the current tune in the #display-current-tune div when the button is clicked', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.get('#display-current-tune').should('contain', '');
  });
});
describe('Testing for UI/CSS', () => {
  it('background of body should be #98AA9F', () => {
    cy.visit('/')
    cy.get('body').should('have.class', 'bg-[#98AA9f]')
  });
  it('All other elements should have background #4D5D53 with text colour #CEE1D5', () => {
    cy.visit('/')
    cy.get('.dark-green').should('have.class', 'bg-[#4D5D53]', 'text-[#CEE1D5]')
  });
  it('heading displays correctly', () => {
    cy.visit('/')
    cy.get('h1').should('have.text', 'Traditional Irish Music Randomizer')
  });
  it('root should match html', () => {
    cy.visit('/');
    cy.root().should('match', 'html');
  })
});


  



