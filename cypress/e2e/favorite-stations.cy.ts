import IRadio from "@/interfaces/IRadio";
import dataStorage from "../fixtures/mock-storage";

describe('Favorite Radios', () => {
  const selectors = {
    stationList: '[data-cy="favorite-stations-list"]',
    stationItem: (id: string) => `[data-cy="${id}"]`,
    editButton: (id: string) => `[data-cy="edit-${id}"]`,
    deleteButton: (id: string) => `[data-cy="delete-${id}"]`,
    searchFavorites: '[data-cy="search-favorites"]',
    clearSearch: '[data-cy="search-favorites-clear"]',
    notFoundMessage: '[data-cy="favorite-stations-list-notfound"] h3',
    notFoundDescription: '[data-cy="favorite-stations-list-notfound"] p',
    playButton: (id: string) => `[data-cy="${id}"] [aria-label="Ouvir"]`,
    stopButton: (id: string) => `[data-cy="${id}"] [aria-label="Parar"]`,
    nextPage: '[data-cy="favorite-stations"] [data-cy="next-page"]',
    prevPage: '[data-cy="favorite-stations"] [data-cy="prev-page"]',
    loaderStation: '[data-cy="loader-station"]',
    stopStation: '[data-cy="stop-station"]',
    dialogEdit: '[data-cy="edit-radio-dialog"]',
    inputName: '[data-cy="edit-radio-dialog"] input#name',
    inputTags: '[data-cy="edit-radio-dialog"] input#tags',
    inputCountry: '[data-cy="edit-radio-dialog"] input#country',
    inputLanguage: '[data-cy="edit-radio-dialog"] input#language',
    saveButton: '[data-cy="edit-radio-dialog-save"]',
    cancelButton: '[data-cy="edit-radio-dialog-cancel"]',
    deleteDialog: '[data-cy="delete-radio-dialog"]',
    deleteButtonDialog: '[data-cy="delete-radio-dialog"] [data-cy="delete-radio-dialog-delete"]',
    cancelDeleteButton: '[data-cy="delete-radio-dialog"] [data-cy="delete-radio-dialog-cancel"]'
  };

  const stationId = 'a25700ef-e952-4b73-8b4e-b92d938cb020';
  const stationIdHls = 'fbe60456-15e8-4db4-a1f1-4ce77b7aaecc';

  const sortStations = (data: IRadio[]) => data.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  })

  const loadFavorites = (favorites = dataStorage) => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('favoriteRadios', JSON.stringify(sortStations(favorites)));
      }
    });
    cy.get('h1').should('not.contain.text', 'Sintonizando');
  };

  it('should render favorite radios saved in storage', () => {
    loadFavorites();
    cy.get(selectors.stationList).children().should('have.length', 10);
    sortStations(dataStorage).slice(0, 9).forEach((station) => {
      cy.get(selectors.stationItem(station.stationuuid)).should('contain.text', station.name?.replace('\t', ''));
    });
  });

  it('should edit a favorite radio', () => {
    loadFavorites();
    cy.get(selectors.editButton(stationId)).click();
    cy.get(selectors.dialogEdit).should('be.visible');

    cy.get(selectors.inputName).clear().type('New Radio');
    cy.get(selectors.inputTags).clear().type('tag1, tag2');
    cy.get(selectors.inputCountry).clear().type('Brazil');
    cy.get(selectors.inputLanguage).clear().type('Portuguese');
    cy.get(selectors.saveButton).click();

    cy.get(`${selectors.stationItem(stationId)} h3`).should('contain.text', 'New Radio');
    cy.get(`${selectors.stationItem(stationId)} p`).should('contain.text', 'Brazil, Portuguese');

    cy.get(selectors.editButton(stationId)).click();
    cy.get(selectors.dialogEdit).should('be.visible');

    cy.get(selectors.cancelButton).should('be.visible').click();
  });

  it('should delete a favorite radio', () => {
    loadFavorites();
    cy.get(selectors.deleteButton(stationId)).click();

    cy.get(selectors.deleteDialog).should('be.visible');
    cy.get(selectors.deleteButtonDialog).click();

    cy.get(selectors.stationList).children().should('have.length', dataStorage.length - 1);

    loadFavorites();

    cy.get(selectors.deleteButton(stationId)).click();
    cy.get(selectors.cancelDeleteButton).should('be.visible').click();
  });

  it('should search for a favorite radio', () => {
    loadFavorites();
    cy.get(selectors.searchFavorites).type('Newstalk ZB Auckland');

    cy.get(selectors.stationList).children().should('have.length', 1);
    cy.get(selectors.stationList).children().should('contain.text', 'Newstalk ZB Auckland');

    cy.get(selectors.clearSearch).click();
  });

  it('should search for a non-existent radio and display an error message', () => {
    loadFavorites();
    cy.get(selectors.searchFavorites).type('Rádio Inexistente');

    cy.get(selectors.notFoundMessage).should('contain.text', 'Nenhuma rádio encontrada');
    cy.get(selectors.notFoundDescription).should('contain.text', 'Adicione suas estações de rádio favoritas para ouvir aqui.');

    cy.get(selectors.searchFavorites).clear();
    cy.get(selectors.stationList).children().should('have.length', 10);
  });

  it('should paginate favorite radios', () => {
    loadFavorites();
    cy.get(selectors.stationList).children().should('have.length', 10);

    cy.get(selectors.nextPage).click();
    cy.get(selectors.stationList).children().should('have.length', 1);

    cy.get(selectors.prevPage).click();
    cy.get(selectors.stationList).children().should('have.length', 10);
  });

  it('should play a favorite radio and verify sorting', () => {
    loadFavorites();
    cy.wait(1000)
    cy.get(selectors.playButton(dataStorage[4].stationuuid)).click();
    cy.get(selectors.loaderStation).should('exist');

    cy.get(selectors.loaderStation).should('not.exist');
    cy.wait(2000);

    cy.get(selectors.stopButton(dataStorage[4].stationuuid)).should('exist');
    cy.get(selectors.stopStation).should('exist');
    cy.get(selectors.stopButton(dataStorage[4].stationuuid)).click();
  });
  it('should play and stop a favorite radio', () => {
    loadFavorites();
    cy.get(selectors.playButton(stationId)).click();

    cy.wait(1000);

    cy.get(selectors.stopButton(stationId)).should('exist');
    cy.get(selectors.stopButton(stationId)).click();
  });

  it('should play and stop a favorite HLS radio', () => {
    loadFavorites();

    cy.get(selectors.searchFavorites).type('Radio Capital');
    cy.get(selectors.playButton(stationIdHls)).click();

    cy.wait(1000);

    cy.get(selectors.stopButton(stationIdHls)).should('exist');
    cy.get(selectors.stopButton(stationIdHls)).click();
  });
});