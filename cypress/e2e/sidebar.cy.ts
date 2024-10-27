import dataStorage from "../fixtures/mock-storage";

describe('Sidebar Tests', () => {
  const selectors = {
    searchInput: '[data-cy="search-input"]',
    clearSearch: '[data-cy="search-input-clear"]',
    noResultsHeader: '[data-cy="search-list-notfound"] h3',
    noResultsParagraph: '[data-cy="search-list-notfound"] p',
    countryFilter: '[data-cy="country-filter"]',
    languageFilter: '[data-cy="language-filter"]',
    filterInput: '[data-cy="search-filter"]',
    radioStation: (id: string) => `[data-cy="${id}"]`,
    favoriteButton: (id: string) => `[data-cy="${id}"] [data-cy="favorite-button"]`,
    tooltip: '[role="tooltip"]',
    nextPage: '[data-cy="sidebar"] [data-cy="next-page"]',
    prevPage: '[data-cy="sidebar"] [data-cy="prev-page"]',
    filterDropdownButton: '[data-cy="filter-dropdown-button"]',
    noMatchMessage: '.text-muted-foreground',
    selectedDisplayCountry: '[data-cy="country-filter"]',
    selectedDisplayLanguage: '[data-cy="language-filter"]',
    closeSearchCountry: '[data-cy="close-search-country"]',
    selectedCountry: (country: string) => `[data-cy="selected-country-${country}"]`,
    currentPage: '[data-cy="page-1"]',
  };

  const stationId = 'a25700ef-e952-4b73-8b4e-b92d938cb020';
  const noRadioText = 'Nenhuma rádio encontrada';
  const tryAgainText = 'Tente novamente com outra pesquisa.';
  const notFoundText = 'Nenhuma correspondência encontrada. Tente novamente.';

  beforeEach(() => {
    cy.intercept('GET', '**/stations/search*', { fixture: 'stations.json' }).as('fetchRadios');
    cy.intercept('GET', '**/countries', { fixture: 'countries.json' }).as('fetchCountries');
    cy.intercept('GET', '**/languages', { fixture: 'languages.json' }).as('fetchLanguages');
    cy.visit('/');
    cy.get('h1').should('not.contain.text', 'Sintonizando');
  });

  const searchRadioByName = (name: string) => {
    cy.get(selectors.searchInput).type(name);
    cy.wait('@fetchRadios');
  };

  const verifyNoResultsMessage = () => {
    cy.get(selectors.noResultsHeader).should('contain', noRadioText);
    cy.get(selectors.noResultsParagraph).should('contain', tryAgainText);
  };

  context('Radio Search and Filter', () => {
    it('should allow searching radios by name', () => {
      searchRadioByName('Newstalk');
      cy.get(selectors.radioStation(stationId)).contains('Newstalk');

      cy.get(selectors.clearSearch).click();
    });

    it('should not find radios when a nonexistent name is searched', () => {
      searchRadioByName('Rádio Inexistente');
      cy.intercept('GET', '**/stations/search*name=R%C3%A1dio+Inexistente', {
        fixture: 'station-not-found.json',
      }).as('fetchRadiosNotFound');
      cy.wait('@fetchRadiosNotFound');
      verifyNoResultsMessage();
    });

    it('should select an option from the filter and verify display updates', () => {
      cy.get(selectors.countryFilter).click();

      cy.get('label').contains('Brazil').click();
      cy.get('label').contains('Andorra').click();
      cy.get(selectors.countryFilter).click(); 

      cy.get(selectors.selectedDisplayCountry).should('contain.text', '2 selecionados');

      cy.get(selectors.selectedCountry('BR')).click();

      cy.get(selectors.languageFilter).click();

      cy.get('label').contains('portuguese').click();
      cy.get(selectors.languageFilter).click();

      cy.get(selectors.selectedDisplayLanguage).should('contain.text', '1 selecionado');
    });

    it('should show no matches message when searching for a non-existent filter item', () => {
      cy.get(selectors.languageFilter).click();

      cy.get(selectors.filterInput).type('Non-existent Language');

      cy.get(selectors.noMatchMessage).should('contain.text', notFoundText);
    });

    it('should filter by country and language', () => {
      cy.wait(['@fetchCountries', '@fetchLanguages']);

      cy.get(selectors.countryFilter).click();
      cy.get(selectors.filterInput).type('Brazil');

      cy.intercept('GET', '**/stations/search*countrycode=BR', {
        fixture: 'stations-brazil.json',
      }).as('fetchRadiosBrazil');

      cy.get('label').contains('Brazil').click();
      cy.get(selectors.countryFilter).click();
      cy.wait('@fetchRadiosBrazil');
      cy.get('h3').should('contain', 'Radio Mix');
    });

    it('should not find radios for an unmatched country filter', () => {
      cy.get(selectors.countryFilter).click();
      cy.get(selectors.filterInput).type('Brazil');
      cy.get('label').contains('Brazil').click();
      cy.get(selectors.countryFilter).click();
      cy.intercept('GET', '**/stations/search*countrycode=BR', {
        fixture: 'station-not-found.json',
      }).as('fetchRadiosBrazil');
      cy.wait('@fetchRadiosBrazil');
      verifyNoResultsMessage();
    });

    it('should not find radios for an unmatched language filter', () => {
      cy.get(selectors.languageFilter).click();
      cy.get(selectors.filterInput).type('Portuguese');
      cy.get('label').contains('portuguese').click();
      cy.get(selectors.languageFilter).click();
      cy.intercept('GET', '**/stations/search*language=portuguese', {
        fixture: 'station-not-found.json',
      }).as('fetchRadiosBrazil');
      cy.wait('@fetchRadiosBrazil');
      verifyNoResultsMessage();
      cy.get('[data-cy="close-search-language"]').click({ force: true });
      cy.get(selectors.radioStation(stationId)).contains('Newstalk');
    });
  });

  context('Radio Interactions', () => {
    it('should display radio info on hover', () => {
      cy.get(selectors.radioStation(stationId)).realHover();
      cy.get(selectors.tooltip).should('contain.text', 'Newstalk');
    });

    it('should favorite a radio station', () => {
      cy.get(selectors.favoriteButton(stationId)).click();
      cy.get(selectors.favoriteButton(stationId)).should('have.attr', 'aria-label', 'Remover favorito');
      cy.window().then((win) => {
        const favorites = JSON.parse(win.localStorage.getItem('favoriteRadios') || '[]');
        expect(favorites[0]).to.deep.include({ stationuuid: stationId });
      });
    });

    it('should unfavorite a radio station', () => {
      cy.visit('/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('favoriteRadios', JSON.stringify(dataStorage));
        }
      });
      cy.get(selectors.favoriteButton(stationId)).should('have.attr', 'aria-label', 'Remover favorito').click();
      cy.get(selectors.favoriteButton(stationId)).should('have.attr', 'aria-label', 'Adicionar favorito');
      cy.window().then((win) => {
        const favorites = JSON.parse(win.localStorage.getItem('favoriteRadios') || '[]');
        expect(favorites).to.be.lengthOf(dataStorage.length - 1);
      });
    });

    it('should navigate search pages forwards and backwards', () => {
      cy.wait(['@fetchCountries', '@fetchLanguages']);
      cy.get(selectors.countryFilter).click();
      cy.get(selectors.filterInput).type('Brazil');
      cy.intercept('GET', '**/stations/search*countrycode=BR', {
        fixture: 'stations-brazil.json',
      }).as('fetchRadiosBrazil');
      cy.get('label').contains('Brazil').click();
      cy.get(selectors.countryFilter).click();
      cy.wait('@fetchRadiosBrazil');
      cy.get('h3').should('contain', 'Radio Mix');

      cy.get(selectors.nextPage).click();
      cy.get('h3').should('contain', 'MGT DANCE HITS');

      cy.get(selectors.prevPage).click();
      cy.get('h3').should('contain', 'Radio Mix');

      cy.get(selectors.currentPage).should('contain', '1').click();
    });
  });
});
