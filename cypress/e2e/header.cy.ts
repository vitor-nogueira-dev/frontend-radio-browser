describe('Header Component', () => {
  const selectors = {
    headerTitle: 'header h1',
    closeSidebarButton: 'button[aria-label="Fechar Sidebar"]',
    openSidebarButton: 'button[aria-label="Abrir Sidebar"]',
    searchButton: 'button[aria-label="Pesquisar Rádios"]',
    favoritesButton: 'button[aria-label="Ver Favoritos"]',
    tooltip: '[role="tooltip"]',
  };

  const hoverAndCheckTooltip = (buttonSelector: string, expectedText: string) => {
    cy.get(buttonSelector).realHover();
    cy.get(selectors.tooltip).should('contain.text', expectedText);
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the title "Radio Browser"', () => {
    cy.get(selectors.headerTitle).should('contain.text', 'Radio Browser');
  });

  context('Sidebar Toggle', () => {
    it('should toggle between "Fechar Sidebar" and "Abrir Sidebar" tooltips on click', () => {
      hoverAndCheckTooltip(selectors.closeSidebarButton, 'Fechar Sidebar');
      cy.get(selectors.closeSidebarButton).click();

      hoverAndCheckTooltip(selectors.openSidebarButton, 'Abrir Sidebar');
      cy.get(selectors.openSidebarButton).click();
    });
  });

  context('Search and Favorites Toggle', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
    });

    it('should toggle between "Pesquisar Rádios" and "Ver Favoritos" tooltips on click', () => {
      hoverAndCheckTooltip(selectors.searchButton, 'Pesquisar Rádios');
      cy.get(selectors.searchButton).click();

      hoverAndCheckTooltip(selectors.favoritesButton, 'Ver Favoritos');
      cy.get(selectors.favoritesButton).click();
    });
  });
});